import {CHECKOUT_CONFIRMATION_MODAL, CHECKOUT_CONFIRMATION_REGISTRATION_FAILED} from './constants'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {addNotification, removeAllNotifications} from '../app/actions'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import * as shippingSelectors from '../../store/checkout/shipping/selectors'
import * as formSelectors from '../../store/form/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
import {checkoutRegister, updatingShippingAndBilling} from '../../integration-manager/checkout/commands'

export const hideRegistrationForm = createAction('Hiding Registration Form (Save Your Address Details)')

export const submitRegisterForm = () => {
    return (dispatch, getState) => {
        dispatch(removeAllNotifications())

        const userCredentials = {
            firstname: shippingSelectors.getShippingFirstName(getState()),
            lastname: shippingSelectors.getShippingLastName(getState()),
            email: getEmailAddress(getState()),
            ...formSelectors.getConfirmationFormValues(getState())
        }

        return checkoutRegister(userCredentials)
            .then(() => {
                dispatch(openModal(CHECKOUT_CONFIRMATION_MODAL))
                dispatch(updatingShippingAndBilling())
                dispatch(hideRegistrationForm())
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
