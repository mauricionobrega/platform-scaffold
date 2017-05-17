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
import {login} from '../../integration-manager/login/commands'

import {getShippingFormValues} from '../../store/form/selectors'
import {addNotification, removeNotification} from '../app/actions'

export const toggleCompanyAndApt = createAction('Toggle the "Company" and "Apt #" fields (Shipping)', ['isCompanyOrAptShown'])
export const showCompanyAndApt = () => toggleCompanyAndApt(true)
export const setCustomerEmailRecognized = createAction('Set Customer email Recognized', ['customerEmailRecognized'])
export const setShowAddNewAddress = createAction('Setting the "Saved/New Address" field', ['showAddNewAddress'])
export const receiveData = createAction('Receive Checkout Shipping Data')

const welcomeBackNotification = {
    content: `Welcome back! Sign in for a faster checkout or continue as a guest.`,
    id: 'shippingWelcomeBackMessage',
    showRemoveButton: true
}

const onShippingEmailRecognized = () => (dispatch) => {
    dispatch(setCustomerEmailRecognized(true))
    dispatch(addNotification(welcomeBackNotification))
}

const onShippingEmailAvailable = () => (dispatch) => {
    dispatch(removeNotification(welcomeBackNotification.id))
    return dispatch(setCustomerEmailRecognized(false))
}

export const onShippingLoginError = (errorMessage) =>
    addNotification({
        content: errorMessage,
        id: 'shippingEmailError',
        showRemoveButton: true
    })

export const submitSignIn = () => (dispatch, getState) => {
    const {
        username,
        password
    } = getShippingFormValues(getState())
    dispatch(removeNotification('shippingEmailError'))
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
    dispatch(receiveCheckoutData({shipping: {address}, emailAddress: formValues.username}))

    return dispatch(submitShippingCommand(address))
        .then((paymentURL) => {
            browserHistory.push({
                pathname: paymentURL
            })
        })
        .catch(() => {
            dispatch(addNotification({
                content: `Unable to save shipping information. Please, check input data.`,
                id: 'submitShippingError',
                showRemoveButton: true
            }))
        })
}

export const isEmailAvailable = () => (dispatch, getState) => {
    const formValues = getShippingFormValues(getState())

    return dispatch(isEmailAvailableCommand(formValues.username))
        .then((emailAvailable) => dispatch(
            emailAvailable
                ? onShippingEmailAvailable()
                : onShippingEmailRecognized()
        ))
}
