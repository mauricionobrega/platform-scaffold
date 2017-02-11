import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import checkoutPaymentParser from './checkout-payment-parser'

export const receiveContents = createAction('Received CheckoutPayment Contents')
export const toggleFixedPlaceOrder = createAction('Toggled the fixed "Place Order" container', 'isFixedPlaceOrderShown')
export const toggleCardInputRadio = createAction('Toggled the card method radio input', 'isNewCardInputSelected')
export const toggleCompanyAptField = createAction('Showing the "Company" and "Apt #" fields', 'isCompanyOrAptShown')
export const toggleNewAddressFields = createAction('Toggled new address fields', 'newShippingAddressIsEnabled')
export const setCvvType = createAction('Setting CVV type', 'cvvType')

export const receiveResponse = (response) => {
    return (dispatch) => {
        return jqueryResponse(response)
            .then(([$, $responseText]) => {
                dispatch(receiveContents(checkoutPaymentParser($, $responseText)))
            })
    }
}

export const fetchContents = () => {
    return (dispatch) => {
        return makeRequest(window.location.href)
            .then((response) => dispatch(receiveResponse(response)))
    }
}
