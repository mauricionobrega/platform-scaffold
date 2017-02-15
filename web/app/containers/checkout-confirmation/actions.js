import checkoutConfirmationParser from './parsers/checkout-confirmation'
import {CHECKOUT_CONFIRMATION_MODAL, CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {createAction, makeRequest, makeFormEncodedRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {addNotification, removeAllNotifications} from '../app/actions'
import {openModal} from '../../store/modals/actions'

export const receiveContents = createAction('Received CheckoutConfirmation Contents')
export const showSuccessModal = createAction('Showing Success modal')
export const showFailNotification = createAction('Showing fail notification')
export const hideModal = createAction('Hiding modal')

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

export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())

        // ....TOP....
        console.log('getState', getState())
        const uuid = 9
        const userCredentials = {
            firstname: `test-firstname-${uuid}`,
            lastname: `test-lastname-${uuid}`,
            email: `mobifyqa+test-email-${uuid}@gmail.com`,
            is_subscribed: 0,
            password: '1234qwer',
            password_confirmation: '1234qwer',

            // Details
            // ---
            company: 'Mobify',
            telephone: '123-123-1234',
            fax: '987-987-9876',

            // Shipping Address
            // ---
            'street[]': '',
            city: 'Vancouver',
            region: 'Canada',
            postcode: 'V5V 5V5',
            country_id: 'CA',

            // Billing Address
            // ---
            // 'street[]': '',
            // city: 'Vancouver',
            // region: 'Canada',
            // postcode: 'V5V 5V5',
            // country_id: 'CA',
        }

        const postCreateAccountURL = 'https://www.merlinspotions.com/customer/account/createpost/'

        // ....BOTTOM....
        makeFormEncodedRequest(postCreateAccountURL, userCredentials, {method: 'POST'})
            .then((response) => {
                const urlHas = (chunk) => response.url.search(chunk) >= 0
                const isNotRedirectedToCreate = urlHas('/account/') && !urlHas('/create/')

                if (response.redirected && isNotRedirectedToCreate) {
                    dispatch(openModal(CHECKOUT_CONFIRMATION_MODAL))
                    // dispatch(hideRegistrationForm()) // @TODO
                } else {
                    dispatch(addNotification({
                        content: `Sorry, registration failed. The email you provided might already be in use.`,
                        id: CHECKOUT_CONFIRMATION_REGISTRATION_FAILED,
                        showRemoveButton: true
                    }))
                }
            })
            .catch((error) => {
                dispatch(addNotification({
                    content: `Sorry, registration Failed. Contact us for assistance. ${error}`,
                    id: CHECKOUT_CONFIRMATION_REGISTRATION_FAILED,
                    showRemoveButton: true
                }))
            })
    }
}
