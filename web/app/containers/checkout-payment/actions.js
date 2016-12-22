import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import checkoutPaymentParser from './checkout-payment-parser'

export const receiveContents = createAction('Received CheckoutPayment Contents')

export const receiveResponse = (response) => {
    return (dispatch) => {
        jqueryResponse(response)
            .then(([$, $responseText]) => {
                dispatch(receiveContents(checkoutPaymentParser($, $responseText)))
            })
    }
}

export const fetchContents = () => {
    return (dispatch) => {
        makeRequest(window.location.href)
            .then((response) => dispatch(receiveResponse(response)))
    }
}
