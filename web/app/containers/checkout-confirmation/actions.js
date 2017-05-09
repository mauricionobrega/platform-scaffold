/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import checkoutConfirmationParser from './parsers/checkout-confirmation'
import {CHECKOUT_CONFIRMATION_MODAL, CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {createAction} from '../../utils/utils'
import {addNotification, removeAllNotifications} from '../app/actions'
import {openModal} from '../../store/modals/actions'
import * as shippingSelectors from '../../store/checkout/shipping/selectors'
import * as formSelectors from '../../store/form/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
import {getFormKey} from '../app/selectors'

// @TODO: blocked until the desktop's Address Book actualy works correctly
// import * as paymentSelectors from '../../store/checkout/payment/selectors'

export const receiveData = createAction('Received Checkout Confirmation Data')
export const showSuccessModal = createAction('Showing Success modal')
export const showFailNotification = createAction('Showing fail notification')
export const hideModal = createAction('Hiding modal')
export const hideRegistrationForm = createAction('Hiding Registration Form (Save Your Address Details)')

export const process = ({payload: {$, $response}}) => receiveData(checkoutConfirmationParser($, $response))

const buildFormData = (formCredentials) => {
    const formData = new FormData()

    for (const key in formCredentials) {
        if (Object.prototype.hasOwnProperty.call(formCredentials, key)) {
            const item = formCredentials[key]
            if (key === 'street') {
                // Street must be converted away from an array, and into a
                // series of `street[]` keys-value pairs. This is what the
                // Magento backend uses to fill out multiple street
                // address fields
                for (let i = 0; i < item.length; i++) {
                    formData.append('street[]', item[i])
                }
            } else {
                formData.append(key, item)
            }
        }
    }

    return formData
}

// @TODO: These are blocked from working until the day that the Address Book on
//        desktop starts working.
//
// export const updateBillingAddress = () => {
//     return (dispatch, getState) => {
//         const formData = buildFormData({
//             form_key: getFormKey(getState()),
//             success_url: '',
//             error_url: '',
//             ...paymentSelectors.getPayment(getState()),
//             default_billing: 1,
//             default_shipping: 1,
//         })
//
//         const postUpdateCustomerAddressURL = '/customer/address/formPost/id/46/'
//         // We need to use jQuery.ajax here because currently fetch sends requests with all headers set to lowercase
//         // using fetch here means the server won't handle our request properly
//         // so instead we're using jQuery ajax since it sends requests matching what the server expects.
//         // see http://stackoverflow.com/questions/34656412/fetch-sends-lower-case-header-keys
//         window.Progressive.$.ajax({
//             url: postUpdateCustomerAddressURL,
//             data: formData,
//             method: 'POST',
//             processData: false,
//             contentType: false,
//             error: (response) => {
//                 console.error('Updating the user Shipping/Billing address failed. Response log:')
//                 console.error(response)
//             }
//         })
//     }
// }
//


export const updatingShippingAndBilling = () => {
    return (dispatch, getState) => {
        const shippingData = shippingSelectors.getShippingAddress(getState()).toJS()
        const formData = buildFormData({
            form_key: getFormKey(getState()),
            success_url: '',
            error_url: '',
            ...shippingData,
            default_billing: 1,
            default_shipping: 1,
        })

        const postUpdateCustomerAddressURL = '/customer/address/formPost/'
        // We need to use jQuery.ajax here because currently fetch sends requests with all headers set to lowercase
        // using fetch here means the server won't handle our request properly
        // so instead we're using jQuery ajax since it sends requests matching what the server expects.
        // see http://stackoverflow.com/questions/34656412/fetch-sends-lower-case-header-keys
        window.Progressive.$.ajax({
            url: postUpdateCustomerAddressURL,
            data: formData,
            method: 'POST',
            processData: false,
            contentType: false,
            // success: () => {
                // @TODO: Once the Address Book on desktop works correctly, we
                //        must implement the ability to update just the Billing
                //        address separately from the Shipping address.
                //
                // const paymentData = paymentSelectors.getPayment(getState())
                // const shippingIsDifferentThanBilling = JSON.stringify(shippingData) !== JSON.stringify(paymentData)
                // if (shippingIsDifferentThanBilling) {
                //     dispatch(updateBillingAddress())
                // }
            // },
            error: (response) => {
                console.error('Updating the user Shipping and Billing address failed. Response log:')
                console.error(response)
            }
        })
    }
}


export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())

        const userCredentials = {
            firstname: shippingSelectors.getShippingFirstName(getState()),
            lastname: shippingSelectors.getShippingLastName(getState()),
            email: getEmailAddress(getState()),
            ...formSelectors.getConfirmationFormValues(getState())
        }

        const postCreateAccountURL = '/customer/account/createpost/'
        makeFormEncodedRequest(postCreateAccountURL, userCredentials, {method: 'POST'})
            .then((response) => {
                const responseUrlHas = (chunk) => response.url.search(chunk) >= 0
                const redirectUrlIsNotToCreate = responseUrlHas('/account/') && !responseUrlHas('/create/')
                const registrationIsSuccess = response.redirected && redirectUrlIsNotToCreate

                if (registrationIsSuccess) {
                    dispatch(openModal(CHECKOUT_CONFIRMATION_MODAL))
                    dispatch(updatingShippingAndBilling())
                    dispatch(hideRegistrationForm())
                } else {
                    dispatch(addNotification({
                        content: `Could not complete registration. The email you provided may already be in use.`,
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
