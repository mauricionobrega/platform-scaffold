/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SubmissionError} from 'redux-form'
import {createBasket, handleCartData} from '../cart/utils'
import {makeApiRequest, makeApiJsonRequest, getAuthToken, getAuthTokenPayload} from '../utils'
import {getOrderTotal} from '../../../store/cart/selectors'
import {populateLocationsData, createOrderAddressObject} from './utils'
import {parseShippingAddressFromBasket} from './parsers'
import {getPaymentURL, getSiteID} from '../constants'
import {STATES} from './constants'
import {receiveOrderConfirmationContents} from '../../results'
import {getCardData} from 'progressive-web-sdk/dist/card-utils'
import {receiveCheckoutData, receiveShippingInitialValues, receiveBillingInitialValues} from './../../checkout/results'

export const fetchShippingMethodsEstimate = () => (dispatch) => {
    return createBasket()
        .then((basket) => {
            return makeApiRequest(`/baskets/${basket.basket_id}/shipments/me/shipping_methods`, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJSON) => {
                    const shippingMethods = responseJSON.applicable_shipping_methods.map(({name, description, price, id}) => {
                        return {
                            label: `${name} - ${description}`,
                            cost: `$${price.toFixed(2)}`,
                            value: id
                        }
                    })

                    return dispatch(receiveCheckoutData({shipping: {shippingMethods}}))
                })
        })
}

export const initCheckoutShippingPage = () => (dispatch) => {
    return createBasket()
        .then((basket) => {
            return makeApiRequest(`/baskets/${basket.basket_id}`, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJSON) => {
                    const {
                        customer_info: {
                            email
                        },
                        shipments: [{
                            shipping_address,
                            shipping_method
                        }]
                    } = responseJSON
                    let initialValues
                    /* eslint-disable camelcase */
                    if (shipping_address) {
                        initialValues = {
                            username: email,
                            name: shipping_address.full_name,
                            company: shipping_address.company_name,
                            addressLine1: shipping_address.address1,
                            addressLine2: shipping_address.address2,
                            countryId: shipping_address.country_code,
                            city: shipping_address.city,
                            regionId: shipping_address.state_code,
                            postcode: shipping_address.postal_code,
                            telephone: shipping_address.phone,
                            shipping_method: shipping_method ? shipping_method.id : undefined
                        }
                    } else {
                        initialValues = {
                            countryId: 'us'
                        }
                    }
                    dispatch(receiveShippingInitialValues({initialValues}))
                    /* eslint-enable camelcase */
                    return dispatch(receiveCheckoutData({
                        locations: {
                            countries: [{value: 'us', label: 'United States'}],
                            regions: STATES
                        }
                    }))
                })
                .then(() => dispatch(fetchShippingMethodsEstimate()))
        })
}

// We don't need to fetch any data for this page
export const initCheckoutConfirmationPage = () => () => Promise.resolve()

export const initCheckoutPaymentPage = () => (dispatch) => {
    dispatch(populateLocationsData())
    return createBasket()
        .then((basket) => {
            return makeApiRequest(`/baskets/${basket.basket_id}`, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJSON) => {
                    const addressData = parseShippingAddressFromBasket(responseJSON)

                    dispatch(receiveShippingInitialValues({initialValues: addressData}))
                    dispatch(receiveBillingInitialValues({initialValues: {...addressData, billing_same_as_shipping: true}}))
                })
        })
}

const setCustomerNameAndEmail = (formValues, basket) => () => {
    const authToken = getAuthTokenPayload(getAuthToken())
    const customerID = JSON.parse(authToken.sub).customer_info.customer_id
    const requestBody = {
        email: formValues.username,
        customer_name: formValues.name,
        customer_id: customerID
    }

    return makeApiJsonRequest(
        `/baskets/${basket.basket_id}/customer`,
        requestBody,
        {method: 'PUT'}
    )
}

const setShippingAddress = (formValues, basket) => () => {
    const orderAddress = createOrderAddressObject(formValues)
    return makeApiJsonRequest(
        `/baskets/${basket.basket_id}/shipments/me/shipping_address?use_as_billing=true`,
        orderAddress,
        {method: 'PUT'}
    )
}

const setShippingMethod = (formValues, basket) => () => (
    makeApiJsonRequest(
        `/baskets/${basket.basket_id}/shipments/me/shipping_method`,
        {id: formValues.shipping_method},
        {method: 'PUT'}
    )
)

export const submitShipping = (formValues) => (dispatch) => {
    return createBasket()
        .then((basket) => dispatch(setCustomerNameAndEmail(formValues, basket)))
        .then((basket) => dispatch(setShippingAddress(formValues, basket)))
        .then((basket) => dispatch(setShippingMethod(formValues, basket)))
        .catch(() => { throw new SubmissionError({_error: 'Unable to save shipping data'}) })
        .then((basket) => {
            dispatch(handleCartData(basket))
            return getPaymentURL()
        })
}

const addPaymentMethod = (formValues, basket) => (dispatch, getState) => {
    const orderTotal = getOrderTotal(getState())
    const type = getCardData(formValues.ccnumber).cardType
    const requestBody = {
        amount: parseFloat(orderTotal.replace('$', '')),
        payment_method_id: 'CREDIT_CARD',
        payment_card: {
            card_type: type
        }
    }

    return makeApiJsonRequest(
        `/baskets/${basket.basket_id}/payment_instruments`,
        requestBody,
        {method: 'POST'}
    )
}

const setBillingAddress = (formValues, basket) => () => {
    if (formValues.billing_same_as_shipping) {
        // No change to the address is necessary
        return Promise.resolve(basket)
    }

    // set billing address
    return makeApiJsonRequest(
        `/baskets/${basket.basket_id}/billing_address?use_as_shipping=false`,
        createOrderAddressObject(formValues),
        {method: 'PUT'}
    )
}

const createOrder = (basket) => () => makeApiJsonRequest('/orders', basket, {method: 'POST'})

const setPaymentMethod = (formValues, order) => () => {
   // set payment method
    const type = getCardData(formValues.ccnumber).cardType
    const expiryMonth = /^\d\d/.exec(formValues.ccexpiry)[0]
    const expiryYear = /\d\d$/.exec(formValues.ccexpiry)[0]
    const paymentInstrumentID = order.payment_instruments[0].payment_instrument_id
    const requestBody = {
        payment_card: {
            card_type: type,
            expiration_month: parseInt(expiryMonth),
            expiration_year: 2000 + parseInt(expiryYear),
            holder: formValues.ccname,
            number: formValues.ccnumber,
            security_code: formValues.cvv
        },
        payment_method_id: 'CREDIT_CARD'
    }

    return makeApiJsonRequest(
        `/orders/${order.order_no}/payment_instruments/${paymentInstrumentID}`,
        requestBody,
        {method: 'PATCH'}
    )
}

export const submitPayment = (formValues) => (dispatch) => {
    return createBasket()
        .then((basket) => dispatch(addPaymentMethod(formValues, basket)))
        .then((basket) => dispatch(setBillingAddress(formValues, basket)))
        .then((basket) => dispatch(createOrder(basket)))
        .then((order) => dispatch(setPaymentMethod(formValues, order)))
        .then((order) => {
            dispatch(receiveOrderConfirmationContents({
                orderNumber: order.order_no
            }))
            return `/on/demandware.store/${getSiteID()}/default/COSummary-Submit`
        })
}

export const updateShippingAndBilling = () => () => Promise.resolve()

// We're not currently checking the customer's email on the sfcc site
// Return true to prevent the welcome banner from showing
export const isEmailAvailable = () => () => Promise.resolve(true)
