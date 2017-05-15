/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {CHECKOUT_CONFIRMATION_MODAL, CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {addNotification, removeAllNotifications} from '../app/actions'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import * as shippingSelectors from '../../store/checkout/shipping/selectors'
import * as formSelectors from '../../store/form/selectors'
import * as paymentSelectors from '../../store/checkout/payment/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
// import {updatingShippingAndBilling} from '../../integration-manager/checkout/commands'
import {updateShippingAddress, updateBillingAddress, registerUser} from '../../integration-manager/login/commands'

export const hideRegistrationForm = createAction('Hiding Registration Form (Save Your Address Details)')

export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())
        const currentState = getState()
        const firstname = shippingSelectors.getShippingFirstName(currentState)
        const lastname = shippingSelectors.getShippingLastName(currentState)
        const email = getEmailAddress(currentState)
        const {
            password,
            password_confirmation
        } = formSelectors.getConfirmationFormValues(currentState)
        const shippingData = shippingSelectors.getShippingAddress(getState()).toJS()
        const paymentData = paymentSelectors.getPayment(getState())
        const shippingIsDifferentThanBilling = JSON.stringify(shippingData) !== JSON.stringify(paymentData)

        return dispatch(registerUser(firstname, lastname, email, password, password_confirmation))
            .then(() => {
                dispatch(openModal(CHECKOUT_CONFIRMATION_MODAL))
                return dispatch(updateShippingAddress(shippingData))
                    .then(() => {
                        if (shippingIsDifferentThanBilling) {
                            dispatch(updateBillingAddress(paymentData))
                        }
                    })
                    .then(() => dispatch(hideRegistrationForm()))
            })
            .catch((error) => {
                if (error.name !== 'SubmissionError') {
                    dispatch(addNotification({
                        content: `Sorry, registration failed. Contact us for assistance. ${error.message}`,
                        id: CHECKOUT_CONFIRMATION_REGISTRATION_FAILED,
                        showRemoveButton: true
                    }))
                } else if (error.message.includes('Unable to save')) {
                    dispatch(addNotification({
                        content: error.message,
                        id: CHECKOUT_CONFIRMATION_REGISTRATION_FAILED,
                        showRemoveButton: true
                    }))
                } else {
                    dispatch(addNotification({
                        content: 'Could not complete registration. The email you provided may already be in use.',
                        id: CHECKOUT_CONFIRMATION_REGISTRATION_FAILED,
                        showRemoveButton: true
                    }))
                }
            })
    }
}
