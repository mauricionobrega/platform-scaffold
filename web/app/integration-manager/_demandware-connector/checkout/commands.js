import {SubmissionError} from 'redux-form'
import {createBasket, parseAndReceiveCartResponse} from '../cart/utils'
import {getOrderTotal} from '../../../store/cart/selectors'
import {makeDemandwareRequest, getAuthTokenPayload, getAuthToken} from '../utils'
import {populateLocationsData, createOrderAddressObject} from './utils'
import {parseShippingAddressFromBasket} from './parsers'
import {API_END_POINT_URL, PAYMENT_URL, SITE_ID} from '../constants'
import {receiveCheckoutData, receiveShippingInitialValues, receiveBillingInitialValues} from './../../checkout/responses'
import {receiveOrderConfirmationContents} from '../../responses'
import {getCardData} from 'progressive-web-sdk/dist/card-utils'

export const fetchShippingMethodsEstimate = () => (dispatch) => {
    return createBasket()
        .then((basket) => {
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/shipments/me/shipping_methods`, {method: 'GET'})
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



export const fetchCheckoutShippingData = () => (dispatch) => {
    return createBasket()
        .then((basket) => {
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}`, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(receiveShippingInitialValues({initialValues: parseShippingAddressFromBasket(responseJSON)}))
                    return dispatch(populateLocationsData())
                })
                .then(() => dispatch(fetchShippingMethodsEstimate()))
        })
}

export const fetchCheckoutPaymentData = () => (dispatch) => {
    dispatch(populateLocationsData())
    return createBasket()
        .then((basket) => {
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}`, {method: 'GET'})
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
            // debugger
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/customer`, requestOptions)
                .then(() => basket.basket_id)
        })
        .then((basketID) => {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify(orderAddress)
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/shipments/me/shipping_address?use_as_billing=true`, requestOptions)
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
                    return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/shipments/me/shipping_method`, shippingMethodRequestOptions)
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            if (responseJSON.fault) {
                                throw new SubmissionError({_error: 'Unable to save shipping data'})
                            }
                            dispatch(parseAndReceiveCartResponse(responseJSON))

                            return PAYMENT_URL
                        })
                })
        })
}

export const submitPayment = (formValues) => (dispatch, getState) => {
    // debugger
    return createBasket()
        .then((basket) => {
            const orderTotal = getOrderTotal(getState())
            const type = getCardData(formValues.ccnumber).cardType
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    amount: orderTotal,
                    payment_method_id: 'CREDIT_CARD',
                    payment_card: {
                        card_type: type
                    }
                })
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/payment_instruments`, requestOptions)
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
                return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basket.basket_id}/billing_address?use_as_shipping=false`, requestOptions)
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
            return makeDemandwareRequest(`${API_END_POINT_URL}/orders`, requestOptions)
                .then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.fault) {
                        throw new Error(responseJSON.fault.message)
                    }
                    return responseJSON
                })
                .then(({order_no, payment_instruments}) => {
                    // set payment method
                    // const orderTotal = getOrderTotal(getState())
                    const type = getCardData(formValues.ccnumber).cardType
                    const expiryMonth = /^\d\d/.exec(formValues.ccexpiry)[0]
                    const expiryYear = /\d\d$/.exec(formValues.ccexpiry)[0]
                    const paymentInstrumentID = payment_instruments[0].payment_instrument_id
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
                    return makeDemandwareRequest(`${API_END_POINT_URL}/orders/${order_no}/payment_instruments/${paymentInstrumentID}`, requestOptions)
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

// We're not currently checking the customer's email on the demandware site
// Return true to prevent the welcome banner from showing
export const checkCustomerEmail = () => () => Promise.resolve(true)

// Checkout sign in is currently not implemented on our demandware site
// The merlin's designs for checkout sign in don't translate well to
// the functionality available to us with demandware
export const checkoutSignIn = () => () => Promise.resolve()
