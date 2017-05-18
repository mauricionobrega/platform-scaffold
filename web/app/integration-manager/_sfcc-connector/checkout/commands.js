/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SubmissionError} from 'redux-form'
import {createBasket, handleCartData} from '../cart/utils'
import {makeSfccRequest, getAuthToken, getAuthTokenPayload} from '../utils'
import {getOrderTotal} from '../../../store/cart/selectors'
import {populateLocationsData, createOrderAddressObject} from './utils'
import {parseShippingAddressFromBasket} from './parsers'
import {API_END_POINT_URL, PAYMENT_URL, SITE_ID} from '../constants'
import {STATES} from './constants'
import {receiveOrderConfirmationContents} from '../../results'
import {getCardData} from 'progressive-web-sdk/dist/card-utils'
import {receiveCheckoutData, receiveShippingInitialValues, receiveBillingInitialValues} from './../../checkout/results'

export const fetchShippingMethodsEstimate = () => (dispatch) => {
    return createBasket()
        .then((basket) => {
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/shipments/me/shipping_methods`, {method: 'GET'})
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
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}`, {method: 'GET'})
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

export const initCheckoutPaymentPage = () => (dispatch) => {
    dispatch(populateLocationsData())
    return createBasket()
        .then((basket) => {
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}`, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJSON) => {
                    const addressData = parseShippingAddressFromBasket(responseJSON)

                    dispatch(receiveShippingInitialValues({initialValues: addressData}))
                    dispatch(receiveBillingInitialValues({initialValues: {...addressData, billing_same_as_shipping: true}}))
                })
        })
}

export const submitShipping = (formValues) => (dispatch) => {
    const {
        name,
        username,
        shipping_method
    } = formValues
    const orderAddress = createOrderAddressObject(formValues)
    return createBasket()
        .then((basket) => {
            const authToken = getAuthTokenPayload(getAuthToken())
            const customerID = JSON.parse(authToken.sub).customer_info.customer_id
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    email: username,
                    customer_name: name,
                    customer_id: customerID
                })
            }
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/customer`, requestOptions)
                .then(() => basket.basket_id)
        })
        .then((basketID) => {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify(orderAddress)
            }
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basketID}/shipments/me/shipping_address?use_as_billing=true`, requestOptions)
                .then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.fault) {
                        throw new SubmissionError({_error: 'Unable to save shipping data'})
                    }
                })
                .then(() => {
                    const shippingMethodRequestOptions = {
                        method: 'PUT',
                        body: JSON.stringify({id: shipping_method})
                    }
                    return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basketID}/shipments/me/shipping_method`, shippingMethodRequestOptions)
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            if (responseJSON.fault) {
                                throw new SubmissionError({_error: 'Unable to save shipping data'})
                            }
                            dispatch(handleCartData(responseJSON))

                            return PAYMENT_URL
                        })
                })
        })
}

const addPaymentMethod = (formValues, basket) => (dispatch, getState) => {
    const orderTotal = getOrderTotal(getState())
    const type = getCardData(formValues.ccnumber).cardType
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            amount: parseFloat(orderTotal.replace('$', '')),
            payment_method_id: 'CREDIT_CARD',
            payment_card: {
                card_type: type
            }
        })
    }

    return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/payment_instruments`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new Error(responseJSON.fault.message)
            }
            return responseJSON /* OCAPI Basket */
        })
}

const setBillingAddress = (formValues, basket) => (dispatch) => {
    if (!formValues.billing_same_as_shipping) {
        // set billing address
        const billingAddress = createOrderAddressObject(formValues)
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(billingAddress)
        }
        return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/billing_address?use_as_shipping=false`, requestOptions)
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.fault) {
                    throw new Error(responseJSON.fault.message)
                }
                return responseJSON /* OCAPI Basket */
            })
    } else {
        // No change
        return basket
    }
}

const createOrder = (basket) => (dispatch) => {
    // place order
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(basket)
    }
    return makeSfccRequest(`${API_END_POINT_URL}/orders`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new Error(responseJSON.fault.message)
            }
            return responseJSON /* OCAPI Order */
        })
}

const setPaymentMethod = (formValues, order) => (dispatch) => {
   // set payment method
    const type = getCardData(formValues.ccnumber).cardType
    const expiryMonth = /^\d\d/.exec(formValues.ccexpiry)[0]
    const expiryYear = /\d\d$/.exec(formValues.ccexpiry)[0]
    const paymentInstrumentID = order.payment_instruments[0].payment_instrument_id
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
            payment_card: {
                card_type: type,
                expiration_month: parseInt(expiryMonth),
                expiration_year: 2000 + parseInt(expiryYear),
                holder: formValues.ccname,
                number: formValues.ccnumber,
                security_code: formValues.cvv
            },
            payment_method_id: 'CREDIT_CARD'
        })
    }

    return makeSfccRequest(`${API_END_POINT_URL}/orders/${order.order_no}/payment_instruments/${paymentInstrumentID}`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new Error(responseJSON.fault.message)
            }
            return responseJSON /* OCAPI Order */
        })
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
            return `/on/demandware.store/${SITE_ID}/default/COSummary-Submit`
        })
}

export const updateShippingAndBilling = () => () => Promise.resolve()

// We're not currently checking the customer's email on the sfcc site
// Return true to prevent the welcome banner from showing
export const isEmailAvailable = () => () => Promise.resolve(true)
