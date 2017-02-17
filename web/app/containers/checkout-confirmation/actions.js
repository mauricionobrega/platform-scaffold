import checkoutConfirmationParser from './parsers/checkout-confirmation'
import {CHECKOUT_CONFIRMATION_MODAL, CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {createAction, makeRequest, makeFormEncodedRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {addNotification, removeAllNotifications} from '../app/actions'
import {openModal} from '../../store/modals/actions'
import customerAddressParser from './parsers/customer-address'
import * as selectors from '../../store/checkout/shipping/selectors'

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

export const updateShippingAddress = (parsedFormData) => {
    return (dispatch, getState) => {

        // Temporary
        const ShippingCredentials = {
            // Parsed Form Data
            ...parsedFormData,

            // ...
            success_url: '',
            error_url: '',

            // ...
            firstname: 'John',
            lastname: 'Doe',

            // Details
            company: 'COMPANY ME BE',
            telephone: '333-222-1111',
            fax: '777-888-9999',

            // Shipping/Billing
            'street[]': 'Shipping Address',
            city: 'BURNABY',
            region_id: '',
            region: 'BC',
            postcode: 'V5V 5V5',
            country_id: 'CA',

            // other form settings
            default_shipping: 1,
        }

        const postUpdateCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/formPost/id/27/'
        const formData = new FormData()
        for (const key in ShippingCredentials) {
            if (Object.prototype.hasOwnProperty.call(ShippingCredentials, key)) {
                formData.append(key, ShippingCredentials[key])
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

export const initiateShippingUpdate = () => {
    return (dispatch) => {
        // Grab required form data in prep for updating shipping/billing information
        const editCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/edit/id/27/'
        makeRequest(editCustomerAddressURL)
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res // eslint-disable-line no-unused-vars
                const parsedFormData = customerAddressParser($, $response)
                dispatch(updateShippingAddress(parsedFormData))
            })
    }
}

export const updateBillingAndShippingAddress = (parsedFormData) => {
    return (dispatch, getState) => {
        // const formData = new FormData()
        // const formCredentials = {
        //     ...parsedFormData,
        //     success_url: '',
        //     error_url: '',
        //     ...selectors.getShipping(getState()),
        //     default_billing: 1,
        //     default_shipping: 1,
        // }

        const formData = buildFormData({
            ...parsedFormData,
            success_url: '',
            error_url: '',
            ...selectors.getShipping(getState()),
            default_billing: 1,
            default_shipping: 1,
        })

        // for (const key in formCredentials) {
        //     if (Object.prototype.hasOwnProperty.call(formCredentials, key)) {
        //         const item = formCredentials[key]
        //         if (item instanceof Array) {
        //             // This item is probably the list of addresses, add them
        //             // all with the same key!
        //             for (let i = 0; i < item.length; i++) {
        //                 console.log('appending street[]...', item[i])
        //                 formData.append('street[]', item[i])
        //             }
        //         } else {
        //             formData.append(key, item)
        //         }
        //     }
        // }

        const postUpdateCustomerAddressURL = 'https://www.merlinspotions.com/customer/address/formPost/'
        window.Progressive.$.ajax({
            url: postUpdateCustomerAddressURL,
            data: formData,
            method: 'POST',
            processData: false,
            contentType: false,
            success: () => {
                // @TODO: REPLACE WITH REAL CHECK
                const shippingIsDifferentThanBilling = true
                if (shippingIsDifferentThanBilling) {
                    // dispatch(initiateShippingUpdate())
                }
            },
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
                dispatch(updateBillingAndShippingAddress(parsedFormData))
            })
    }
}

export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())

        // UUID (temporary for debugging)
        const uuid = Date.now()

        // @TODO: REPLACE THESE WITH ACTUAL DATA
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
