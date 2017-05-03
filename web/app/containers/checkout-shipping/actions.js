/* eslint-disable import/namespace */
/* eslint-disable import/named */
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from '../../utils/utils'
import {UnwrappedCheckoutShipping} from '../templates'
import checkoutShippingParser from './parsers/checkout-shipping'
import {addNotification, fetchPage, removeAllNotifications, removeNotification} from '../app/actions'
import {getCustomerEntityID} from '../../store/checkout/selectors'
import {getIsLoggedIn} from '../app/selectors'
import {getShippingFormValues} from '../../store/form/selectors'
import {getSavedAddresses} from '../../store/checkout/shipping/selectors'
import {receiveCheckoutData} from '../../store/checkout/actions'
import {ADD_NEW_ADDRESS_FIELD} from './constants'

import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')
export const setShowAddNewAddress = createAction('Setting the "Saved/New Address" field', 'showAddNewAddress')
export const receiveData = createAction('Receive Checkout Shipping Data')

export const process = ({payload: {$, $response}}) => {
    return receiveData(checkoutShippingParser($, $response))
}

export const onShippingEmailRecognized = () => {
    return (dispatch) => {
        dispatch(receiveData({customerEmailRecognized: true}))
        dispatch(addNotification({
            content: `Welcome back! Sign in for a faster checkout or continue as a guest.`,
            id: 'shippingWelcomeBackMessage',
            showRemoveButton: true
        }))
    }
}

export const onShippingEmailNotRecognized = () => {
    return (dispatch) => {
        dispatch(removeNotification('shippingWelcomeBackMessage'))
        dispatch(receiveData({customerEmailRecognized: false}))
    }
}

export const checkCustomerEmail = () => {
    return (dispatch, getState) => {
        const formValues = getShippingFormValues(getState())

        makeJsonEncodedRequest('/rest/default/V1/customers/isEmailAvailable', {customerEmail: formValues.username}, {method: 'POST'})
            .then((response) => response.text())
            .then((responseText) => {
                if (/false/.test(responseText)) {
                    dispatch(onShippingEmailRecognized())
                } else {
                    dispatch(onShippingEmailNotRecognized())
                }
            })
    }
}

export const submitSignIn = () => {
    return (dispatch, getState) => {
        const {
            username,
            password
        } = getShippingFormValues(getState())

        // This data has to be sent via AJAX, it doesn't work with makeJsonEncodedRequest
        // If we send this using makeRequest, fetch or makeJsonEncodedRequest we get back a 400 (bad request) error
        // After comparing our request (using makeRequest, fetch or makeJsonEncodedRequest) to the desktop request (using AJAX)
        // The only difference we could find is that the desktop request is sent via AJAX and therefor includes the header X-Requested-With: XMLHttpRequest
        window.Progressive.$.ajax({
            url: '/customer/ajax/login',
            data: JSON.stringify({username, password, context: 'checkout'}),
            method: 'POST',
            success: (responseData) => {
                dispatch(removeAllNotifications())
                if (responseData.errors) {
                    dispatch(addNotification({
                        content: responseData.message,
                        id: 'shippingEmailError',
                        showRemoveButton: true
                    }))
                } else {
                    // Refetch the page now that the user is logged in
                    dispatch(fetchPage(window.location.href, UnwrappedCheckoutShipping, 'checkingShipping'))
                }
            }
        })
    }
}

export const submitShipping = () => {
    return (dispatch, getState) => {
        const currentState = getState()
        const submittingWithNewAddress = getShippingFormValues(currentState).saved_address === ADD_NEW_ADDRESS_FIELD
        let address

        if (submittingWithNewAddress) {
            const {name} = getShippingFormValues(currentState)
            const names = name.split(' ')
            const newAddress = getShippingFormValues(currentState)

            address = {
                firstname: names.slice(0, -1).join(' '),
                lastname: names.slice(-1).join(' '),
                company: newAddress.company || '',
                telephone: newAddress.telephone,
                postcode: newAddress.postcode,
                city: newAddress.city,
                street: newAddress.addressLine2
                    ? [newAddress.addressLine1, newAddress.addressLine2]
                    : [newAddress.addressLine1],
                region_id: newAddress.region_id,
                region: newAddress.region,
                country_id: newAddress.country_id,
                save_in_address_book: true
            }
        } else {
            const {saved_address} = getShippingFormValues(currentState)
            const savedAddress = getSavedAddresses(currentState).toJS()
                .filter((address) => address.id === parseInt(saved_address))[0] || {}

            address = {
                firstname: savedAddress.firstname,
                lastname: savedAddress.lastname,
                company: savedAddress.company,
                telephone: savedAddress.telephone,
                postcode: savedAddress.postcode,
                city: savedAddress.city,
                street: savedAddress.street[1]
                    ? [savedAddress.street[0], savedAddress.street[1]]
                    : [savedAddress.street[0]],
                region_id: savedAddress.region.region_id,
                region: savedAddress.region.region,
                country_id: savedAddress.country_id,
                save_in_address_book: false
            }
        }

        // Prepare to update the store with the information submitted so far
        const {username, shipping_method} = getShippingFormValues(currentState)
        const shipping = {
            address: {
                ...address,
                shipping_method,
            }
        }
        dispatch(receiveCheckoutData({shipping, emailAddress: username}))

        // Prepare and then run Shipping Information request
        const shippingSelections = shipping_method.split('_')
        const addressData = {
            addressInformation: {
                shippingAddress: address,
                billingAddress: {
                    ...address,
                    saveInAddressBook: false
                },
                shipping_carrier_code: shippingSelections[0],
                shipping_method_code: shippingSelections[1]
            }
        }
        const entityID = getCustomerEntityID(currentState)
        const isLoggedIn = getIsLoggedIn(currentState)
        const persistShippingURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/shipping-information`
        makeJsonEncodedRequest(persistShippingURL, addressData, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.payment_methods) {
                    // TO DO: send response data to the next container
                    browserHistory.push({
                        pathname: '/checkout/payment/'
                    })
                }
            })
    }
}
