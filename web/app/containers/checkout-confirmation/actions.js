import checkoutConfirmationParser from './parsers/checkout-confirmation'
import {CHECKOUT_CONFIRMATION_MODAL, CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {createAction, makeRequest, makeFormEncodedRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {addNotification, removeAllNotifications} from '../app/actions'
import {openModal} from '../../store/modals/actions'
import customerAddressParser from './parsers/customer-address'
import * as shippingSelectors from '../../store/checkout/shipping/selectors'
import * as formSelectors from '../../store/form/selectors'
import {selectorToJS} from '../../utils/selector-utils'

// @TODO: blocked until the desktop's Address Book actualy works correctly
// import * as paymentSelectors from '../../store/checkout/payment/selectors'

export const receiveContents = createAction('Received CheckoutConfirmation Contents')
export const showSuccessModal = createAction('Showing Success modal')
export const showFailNotification = createAction('Showing fail notification')
export const hideModal = createAction('Hiding modal')
export const hideRegistrationForm = createAction('Hiding Registration Form (Save Your Address Details)')

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

// @TODO: These are blocked from working until the day that the Address Book on
//        desktop starts working.
//
// export const updateBillingAddress = (parsedFormData) => {
//     return (dispatch, getState) => {
//         const formData = buildFormData({
//             ...parsedFormData,
//             success_url: '',
//             error_url: '',
//             ...paymentSelectors.getPayment(getState()),
//             default_billing: 1,
//             default_shipping: 1,
//         })
//
//         const postUpdateCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/formPost/id/46/'
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
// export const initiateBillingUpdate = () => {
//     return (dispatch) => {
//         // Grab required form data in prep for updating shipping/billing information
//         const editCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/edit/id/46/'
//         makeRequest(editCustomerAddressURL)
//             .then(jqueryResponse)
//             .then((res) => {
//                 const [$, $response] = res // eslint-disable-line no-unused-vars
//                 const parsedFormData = customerAddressParser($, $response)
//                 console.log('dispatch: updateBillingAddress')
//                 dispatch(updateBillingAddress(parsedFormData))
//             })
//     }
// }

export const updateingShippingAndBilling = (parsedFormData) => {
    return (dispatch, getState) => {
        const shippingData = selectorToJS(shippingSelectors.getShippingAddress)(getState())
        const formData = buildFormData({
            ...parsedFormData,
            success_url: '',
            error_url: '',
            ...shippingData,
            default_billing: 1,
            default_shipping: 1,
        })

        const postUpdateCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/formPost/'
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
                //     dispatch(initiateBillingUpdate())
                // }
            // },
            error: (response) => {
                console.error('Updating the user Shipping and Billing address failed. Response log:')
                console.error(response)
            }
        })
    }
}

export const initiateBillingAndShippingUpdate = () => {
    return (dispatch) => {
        // Grab required form data in prep for updating shipping/billing information
        const editCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/edit/'
        makeRequest(editCustomerAddressURL)
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res // eslint-disable-line no-unused-vars
                const parsedFormData = customerAddressParser($, $response)
                dispatch(updateingShippingAndBilling(parsedFormData))
            })
    }
}

export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())

        // @TODO: REPLACE THESE WITH ACTUAL DATA
        const userCredentials = {
            firstname: shippingSelectors.getShippingFirstName(getState()),
            lastname: shippingSelectors.getShippingLastName(getState()),
            email: shippingSelectors.getEmail(getState()),
            ...formSelectors.getConfirmationFormValues(getState())
        }

        const postCreateAccountURL = 'https://www.merlinspotions.com/customer/account/createpost/'

        // ....BOTTOM....
        makeFormEncodedRequest(postCreateAccountURL, userCredentials, {method: 'POST'})
            .then((response) => {
                const urlHas = (chunk) => response.url.search(chunk) >= 0
                const isNotRedirectedToCreate = urlHas('/account/') && !urlHas('/create/')

                if (response.redirected && isNotRedirectedToCreate) {
                    dispatch(openModal(CHECKOUT_CONFIRMATION_MODAL))
                    dispatch(initiateBillingAndShippingUpdate())
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
