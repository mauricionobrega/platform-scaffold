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
import {receiveShippingInitialValues, receiveBillingInitialValues, receiveShippingMethods, receiveCheckoutLocations} from './../../checkout/results'
import {receiveOrderConfirmationContents} from '../../results'
import {getCardData} from 'progressive-web-sdk/dist/card-utils'

const basketUrl = (basketID) => `${API_END_POINT_URL}/baskets/${basketID}`

export const fetchShippingMethodsEstimate = () => (dispatch) => {
    return createBasket()
        .then((basket) => makeSfccRequest(`${basketUrl(basket.basket_id)}/shipments/me/shipping_methods`, {method: 'GET'}))
        .then((response) => response.json())
        .then(({applicable_shipping_methods}) => dispatch(receiveShippingMethods(
            applicable_shipping_methods.map(({name, description, price, id}) => ({
                label: `${name} - ${description}`,
                cost: `$${price.toFixed(2)}`,
                id
            }))
        )))
}

export const initCheckoutShippingPage = () => (dispatch) => {
    return createBasket()
        .then((basket) => makeSfccRequest(basketUrl(basket.basket_id), {method: 'GET'}))
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
            /* eslint-enable camelcase */
            dispatch(receiveShippingInitialValues({initialValues}))
            dispatch(receiveCheckoutLocations({
                countries: [
                    {id: 'us', label: 'United States', regionRequired: true, postcodeRequired: true}
                ],
                regions: STATES
            }))
            dispatch(fetchShippingMethodsEstimate())
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
            return makeSfccRequest(`${basketUrl(basket.basket_id)}/customer`, requestOptions)
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

export const submitPayment = (formValues) => (dispatch, getState) => {
    return createBasket()
        .then((basket) => {
            const orderTotal = getOrderTotal(getState())
            const type = getCardData(formValues.ccnumber).cardType
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    amount: parseInt(orderTotal.replace('$', '')),
                    payment_method_id: 'CREDIT_CARD',
                    payment_card: {
                        card_type: type
                    }
                })
            }
            return makeSfccRequest(`${basketUrl(basket.basket_id)}/payment_instruments`, requestOptions)
                .then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.fault) {
                        throw new Error(responseJSON.fault.message)
                    }
                    return responseJSON
                })
        })
        .then((basket) => {
            if (!formValues.billing_same_as_shipping) {
                // set billing address
                const billingAddress = createOrderAddressObject(formValues)
                const requestOptions = {
                    method: 'PUT',
                    body: JSON.stringify(billingAddress)
                }
                return makeSfccRequest(`${basketUrl(basket.basket_id)}/billing_address?use_as_shipping=false`, requestOptions)
                    .then((response) => response.json())
                    .then((responseJSON) => {
                        if (responseJSON.fault) {
                            throw new Error(responseJSON.fault.message)
                        }
                        return responseJSON
                    })
            }
            return basket
        })
        .then((basket) => {
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
                    return responseJSON
                })
                .then((orderData) => {
                    // set payment method
                    const type = getCardData(formValues.ccnumber).cardType
                    const expiryMonth = /^\d\d/.exec(formValues.ccexpiry)[0]
                    const expiryYear = /\d\d$/.exec(formValues.ccexpiry)[0]
                    const paymentInstrumentID = orderData.payment_instruments[0].payment_instrument_id
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
                    return makeSfccRequest(`${API_END_POINT_URL}/orders/${orderData.order_no}/payment_instruments/${paymentInstrumentID}`, requestOptions)
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            if (responseJSON.fault) {
                                throw new Error(responseJSON.fault.message)
                            }
                            return responseJSON
                        })
                })
                .then((responseJSON) => {
                    dispatch(receiveOrderConfirmationContents({
                        orderNumber: responseJSON.order_no
                    }))
                    return `/on/demandware.store/${SITE_ID}/default/COSummary-Submit`
                })
        })
}

export const updateShippingAndBilling = () => () => Promise.resolve()

// We're not currently checking the customer's email on the sfcc site
// Return true to prevent the welcome banner from showing
export const isEmailAvailable = () => () => Promise.resolve(true)
