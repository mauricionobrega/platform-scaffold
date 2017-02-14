import checkoutConfirmationParser from './parsers/checkout-confirmation'
// import {CHECKOUT_CONFIRMATION_MODAL} from './constants'
import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
// import * as modalActions from '../../store/modals/actions'

export const receiveContents = createAction('Received CheckoutConfirmation Contents')
export const showModal = createAction('Showing modal')
export const hideModal = createAction('Hiding modal')
// export const openCheckoutConfirmationModal = () => (dispatch) => {
//     dispatch(modalActions.openModal(CHECKOUT_CONFIRMATION_MODAL))
// }

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
