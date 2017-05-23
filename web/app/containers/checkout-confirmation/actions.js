/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {CHECKOUT_CONFIRMATION_MODAL, CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {addNotification, removeAllNotifications} from '../app/actions'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import * as shippingSelectors from '../../store/checkout/shipping/selectors'
import * as formSelectors from '../../store/form/selectors'
import {getBillingAddress} from '../../store/checkout/billing/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
import {updateShippingAddress, updateBillingAddress, registerUser} from '../../integration-manager/login/commands'

export const hideRegistrationForm = createAction('Hiding Registration Form (Save Your Address Details)')

const registrationFormSelector = createPropsSelector({
    firstname: shippingSelectors.getShippingFirstName,
    lastname: shippingSelectors.getShippingLastName,
    email: getEmailAddress,
    formValues: formSelectors.getConfirmationFormValues,
    shippingData: shippingSelectors.getShippingAddress,
    billingAddressData: getBillingAddress
})

export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())
        const {
            firstname,
            lastname,
            email,
            formValues: {
                password,
                password_confirmation
            },
            shippingData,
            billingAddressData
        } = registrationFormSelector(getState())

        return dispatch(registerUser(firstname, lastname, email, password, password_confirmation))
            .then(() => {
                dispatch(openModal(CHECKOUT_CONFIRMATION_MODAL))
                return dispatch(updateShippingAddress(shippingData))
                    .then(() => {
                        if (!billingAddressData.sameAsShipping) {
                            return dispatch(updateBillingAddress(billingAddressData))
                        }

                        return Promise.resolve()
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
