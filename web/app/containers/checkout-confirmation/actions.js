import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import checkoutConfirmationParser from './checkout-confirmation-parser'

export const receiveContents = createAction('Received CheckoutConfirmation Contents')

export const receiveResponse = (response) => {
    return (dispatch) => {
        return jqueryResponse(response)
            .then(([$, $responseText]) => {
                dispatch(receiveContents(checkoutConfirmationParser($, $responseText)))
            })
    }
}

export const fetchContents = () => {
    return (dispatch) => {
        return makeRequest(window.location.href)
            .then((response) => dispatch(receiveResponse(response)))
    }
}
