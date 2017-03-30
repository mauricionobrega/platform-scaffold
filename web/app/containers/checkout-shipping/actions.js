import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {submitShipping as submitShippingCommand, checkCustomerEmail as checkCustomerEmailCommand, checkoutSignIn} from '../../integration-manager/checkout/commands'
import {getShippingFormValues} from '../../store/form/selectors'
import {addNotification, removeNotification} from '../app/actions'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')
export const receiveCheckoutShippingData = createAction('Receive Checkout Shipping Data')

const onShippingEmailRecognized = () => {
    return (dispatch) => {
        dispatch(receiveCheckoutShippingData({customerEmailRecognized: true}))
        dispatch(addNotification({
            content: `Welcome back! Sign in for a faster checkout or continue as a guest.`,
            id: 'shippingWelcomeBackMessage',
            showRemoveButton: true
        }))
    }
}

const onShippingEmailAvailable = () => {
    return (dispatch) => {
        dispatch(removeNotification('shippingWelcomeBackMessage'))
        dispatch(receiveCheckoutShippingData({customerEmailRecognized: false}))
    }
}

export const onShippingLoginError = (errorMessage) => {
    return (dispatch) => {
        dispatch(addNotification({
            content: errorMessage,
            id: 'shippingEmailError',
            showRemoveButton: true
        }))
    }
}

export const submitSignIn = () => (dispatch, getState) => {
    const formValues = getShippingFormValues(getState())
    return dispatch(checkoutSignIn(formValues))
        .catch((error) => dispatch(onShippingLoginError(error.message)))
}

export const submitShipping = () => (dispatch, getState) => {
    const currentState = getState()
    const formValues = getShippingFormValues(currentState)
    return dispatch(submitShippingCommand(formValues))
}

export const checkCustomerEmail = () => (dispatch) => {
    return dispatch(checkCustomerEmailCommand())
        .then((emailAvailable) => {
            if (emailAvailable) {
                return dispatch(onShippingEmailAvailable())
            }
            return dispatch(onShippingEmailRecognized())
        })
}
