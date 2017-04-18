import {SubmissionError} from 'redux-form'
import {createBasket} from '../cart/utils'
import {getSubtotal} from '../../store/cart/selectors'
import {makeDemandwareRequest} from '../utils'
import {populateLocationsData} from './utils'
import {parseShippingAddressFromBasket} from './parsers'
import {API_END_POINT_URL, PAYMENT_URL} from '../constants'
import {receiveCheckoutData, receiveShippingInitialValues, receiveBillingInitialValues} from './../../checkout/responses'
import {getCardData} from 'progressive-web-sdk/dist/card-utils'

export const fetchShippingMethodsEstimate = () => (dispatch) => {
    return createBasket()
        .then((basketID) => {
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/shipments/me/shipping_methods`, {method: 'GET'})
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
        .then((basketID) => {
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}`, {method: 'GET'})
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
        .then((basketID) => {
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}`, {method: 'GET'})
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
        firstname,
        lastname,
        username,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        telephone,
        shipping_method
    } = formValues
    return createBasket()
        .then((basketID) => {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    email: username,
                    customer_name: name
                })
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/customer`, requestOptions)
                .then(() => basketID)
        })
        .then((basketID) => {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    address1: addressLine1,
                    address2: addressLine2,
                    city,
                    country_code: countryId,
                    first_name: firstname,
                    last_name: lastname,
                    full_name: name,
                    phone: telephone,
                    postal_code: postcode,
                    state_code: regionId,
                    company_name: company
                })


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

                            return PAYMENT_URL
                        })
                })
        })
}

export const submitPayment = (formValues) => (dispatch, getState) => {
    let basket
    return createBasket()
        .then((basketID) => {
            basket = basketID
            return basket
        })
        .then((basketID) => {
            // set payment method
            const orderTotal = getSubtotal(getState())
            const type = getCardData(formValues.ccnumber).cardType
            const expiryMonth = /^\d\d/.exec(formValues.ccexpiry)[0]
            const expiryYear = /\d\d$/.exec(formValues.ccexpiry)[0]
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    payment_card: {
                        amount: orderTotal,
                        card_type: type,
                        expiration_month: parseInt(expiryMonth),
                        expiration_year: parseInt(expiryYear),
                        holder: formValues.ccname,
                        number: formValues.ccnumber,
                        security_code: formValues.cvv
                    },
                    payment_method_id: 'CREDIT_CARD'
                })
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/payment_instruments`, requestOptions)
                .then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.fault) {
                        throw new Error(responseJSON.fault)
                    }
                })
        })
        // .then(() => {
        //     if (!formValues.billing_same_as_shipping) {
        //         // set billing address
        //     }
        // })
        // .then(() => {
        //     // place order
        // })



}

// We're not currently checking the customer's email on the demandware site
// Return true to prevent the welcome banner from showing
export const checkCustomerEmail = () => () => Promise.resolve(true)

// Checkout sign in is currently not implemented on our demandware site
// The merlin's designs for checkout sign in don't translate well to
// the functionality available to us with demandware
export const checkoutSignIn = () => () => Promise.resolve()
