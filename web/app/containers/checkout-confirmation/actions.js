import checkoutConfirmationParser from './parsers/checkout-confirmation'
import {CHECKOUT_CONFIRMATION_MODAL, CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {createAction, makeRequest, makeFormEncodedRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {addNotification, removeAllNotifications} from '../app/actions'
import {openModal} from '../../store/modals/actions'
import customerAddressParser from './parsers/customer-address'

export const receiveContents = createAction('Received CheckoutConfirmation Contents')
export const showSuccessModal = createAction('Showing Success modal')
export const showFailNotification = createAction('Showing fail notification')
export const hideModal = createAction('Hiding modal')
export const hideRegistrationForm = createAction('Hiding Registration Form (Save Your Address Details)')

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

export const updateShippingAndBilling = (parsedFormData) => {
    return (dispatch, getState) => {
        console.log('Updating Shipping/Billing!!!!')
        console.log('getState', getState())

        const formCredentials = {
            // Parsed Form Data
            ...parsedFormData,

            // ...
            success_url: '',
            error_url: '',

            //
            firstname: 'Billy',
            lastname: 'Bob',

            // Details
            company: 'I AM COMPANY',
            telephone: '111-222-3333',
            fax: '999-888-7777',

            // Shipping/Billing
            'street[]': 'street address',
            city: 'Vancouver',
            region_id: '',
            region: 'BC',
            postcode: 'V5V 5V5',
            country_id: 'CA',

            // other form settings
            default_billing: 1,
            default_shipping: 1,
        }

        const postUpdateCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/formPost/'
        const formData = new FormData()
        for (const key in formCredentials) {
            if (Object.prototype.hasOwnProperty.call(formCredentials, key)) {
                console.log(key, formCredentials[key])
                formData.append(key, formCredentials[key])
            }
        }

        window.Progressive.$.ajax({
            url: postUpdateCustomerAddressURL,
            data: formData,
            method: 'POST',
            processData: false,
            contentType: false,
            error: (response) => {
                console.error('Updating the user Shipping/Billing address failed. Response log:')
                console.error(response)
            }
        })
    }
}

export const initiateShippingAndBillingUpdate = () => {
    return (dispatch) => {
        // Grab required form data in prep for updating shipping/billing information
        const editCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/edit/'
        makeRequest(editCustomerAddressURL)
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res // eslint-disable-line no-unused-vars
                const parsedFormData = customerAddressParser($, $response)
                dispatch(updateShippingAndBilling(parsedFormData))
            })
    }
}

export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())

        // ....TOP....
        console.log('getState', getState())

        // UUID (temporary for debugging)
        const uuid = Date.now()

        const userCredentials = {
            firstname: `test-firstname-${uuid}`,
            lastname: `test-lastname-${uuid}`,
            email: `mobifyqa+test-email-${uuid}@gmail.com`,
            password: '1234qwer',
            password_confirmation: '1234qwer',
        }

        const postCreateAccountURL = 'https://www.merlinspotions.com/customer/account/createpost/'

        // ....BOTTOM....
        makeFormEncodedRequest(postCreateAccountURL, userCredentials, {method: 'POST'})
            .then((response) => {
                const urlHas = (chunk) => response.url.search(chunk) >= 0
                const isNotRedirectedToCreate = urlHas('/account/') && !urlHas('/create/')

                if (response.redirected && isNotRedirectedToCreate) {
                    dispatch(openModal(CHECKOUT_CONFIRMATION_MODAL))
                    dispatch(initiateShippingAndBillingUpdate())
                    dispatch(hideRegistrationForm())
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
