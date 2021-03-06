/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/namespace */
/* eslint-disable import/named */
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

import {splitFullName} from '../../utils/utils'
import {receiveCheckoutData} from '../../integration-manager/checkout/results'

import {
    submitShipping as submitShippingCommand,
    isEmailAvailable as isEmailAvailableCommand
} from '../../integration-manager/checkout/commands'
import {login} from '../../integration-manager/account/commands'

import {getShippingFormValues} from '../../store/form/selectors'
import {addNotification, removeNotification} from 'progressive-web-sdk/dist/store/notifications/actions'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')
export const setCustomerEmailRecognized = createAction('Set Customer email Recognized', ['customerEmailRecognized'])
export const setShowAddNewAddress = createAction('Setting the "Saved/New Address" field', ['showAddNewAddress'])
export const receiveData = createAction('Receive Checkout Shipping Data')

const WELCOME_BACK_NOTIFICATION_ID = 'shippingWelcomeBackMessage'

const onShippingEmailRecognized = () => (dispatch) => {
    dispatch(setCustomerEmailRecognized(true))
    dispatch(addNotification(
        WELCOME_BACK_NOTIFICATION_ID,
        'Welcome back! Sign in for a faster checkout or continue as a guest.',
        true
    ))
}

const onShippingEmailAvailable = () => (dispatch) => {
    dispatch(removeNotification(WELCOME_BACK_NOTIFICATION_ID))
    return dispatch(setCustomerEmailRecognized(false))
}

export const onShippingLoginError = (errorMessage) =>
    addNotification(
        'shippingEmailError',
        errorMessage,
        true
    )

export const submitSignIn = () => (dispatch, getState) => {
    const {
        username,
        password
    } = getShippingFormValues(getState())
    return dispatch(login(username, password, 'on'))
        .catch((error) => dispatch(onShippingLoginError(error.message)))
}

export const submitShipping = () => (dispatch, getState) => {
    const currentState = getState()
    const formValues = getShippingFormValues(currentState)
    const {firstname, lastname} = splitFullName(formValues.name)
    const address = {
        firstname,
        lastname,
        ...formValues
    }
    const shippingData = {shipping: {address}}

    if (formValues.username) {
        shippingData.emailAddress = formValues.username
    }
    dispatch(receiveCheckoutData(shippingData))
    return dispatch(submitShippingCommand(address))
        .then((paymentURL) => {
            browserHistory.push({
                pathname: paymentURL
            })
        })
        .catch(() => {
            dispatch(addNotification(
                'submitShippingError',
                `Unable to save shipping information. Please, check input data.`,
                true
            ))
        })
}

export const isEmailAvailable = () => (dispatch, getState) => {
    const formValues = getShippingFormValues(getState())

    return dispatch(isEmailAvailableCommand(formValues.username))
        .then((emailAvailable) => {
            if (emailAvailable) {
                return dispatch(onShippingEmailAvailable())
            }
            return dispatch(onShippingEmailRecognized())
        })
}
