import {createAction} from '../../utils/utils'
import CheckoutShipping from './container'
import {addNotification, fetchPage, removeAllNotifications, removeNotification} from '../app/actions'
import {getShippingFormValues} from '../../store/form/selectors'

import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')
export const receiveData = createAction('Receive Checkout Shipping Data')


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

        makeJsonEncodedRequest('https://www.merlinspotions.com/rest/default/V1/customers/isEmailAvailable', {customerEmail: formValues.username}, {method: 'POST'})
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
            url: 'https://www.merlinspotions.com/customer/ajax/login',
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
                    dispatch(fetchPage(window.location.href, CheckoutShipping, 'checkingShipping'))
                }
            }
        })
    }
}
