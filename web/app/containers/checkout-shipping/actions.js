import {createAction} from '../../utils/utils'
import {submitShipping as submitShippingCommand, checkCustomerEmail as checkCustomerEmailCommand} from '../../integration-manager/checkout/commands'
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

export const onShippingLoginError = (responseData) => {
    return (dispatch) => {
        dispatch(addNotification({
            content: responseData.message,
            id: 'shippingEmailError',
            showRemoveButton: true
        }))
    }
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
