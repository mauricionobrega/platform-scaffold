import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import checkoutShippingParser from './checkout-shipping-parser'
import {addNotification} from '../app/actions'

export const receiveContents = createAction('Received CheckoutShipping Contents')
export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')

export const receiveResponse = (response) => {
    return (dispatch) => {
        return jqueryResponse(response)
            .then(([$, $responseText]) => {
                dispatch(receiveContents(checkoutShippingParser($, $responseText)))
            })
    }
}

export const fetchContents = () => {
    return (dispatch) => {
        return makeRequest(window.location.href)
            .then((response) => dispatch(receiveResponse(response)))
    }
}

export const onShippingEmailRecognized = () => {
    return (dispatch) => {
        dispatch(addNotification({
            content: `Welcome back! Sign in for a faster checkout or continue as a guest.`,
            id: 'shippingWelcomeBackMessage',
            showRemoveButton: true
        }))
    }
}
