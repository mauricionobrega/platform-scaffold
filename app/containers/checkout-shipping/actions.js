import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import checkoutShippingParser from './checkout-shipping-parser'

export const receiveContents = createAction('Received CheckoutShipping Contents')
export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')

export const receiveResponse = (response) => {
    return (dispatch) => {
        jqueryResponse(response)
            .then(([$, $responseText]) => {
                dispatch(receiveContents(checkoutShippingParser($, $responseText)))
            })
    }
}

export const fetchContents = () => {
    return (dispatch) => {
        makeRequest(window.location.href)
            .then((response) => dispatch(receiveResponse(response)))
    }
}
