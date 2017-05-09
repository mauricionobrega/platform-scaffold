import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {splitFullName} from '../../utils/utils'
import {receiveCheckoutData} from '../../store/checkout/actions'
import {
    submitShipping as submitShippingCommand,
    checkCustomerEmail as checkCustomerEmailCommand,
    checkoutSignIn
} from '../../integration-manager/checkout/commands'
import {getShippingFormValues} from '../../store/form/selectors'
import {addNotification, removeNotification} from '../app/actions'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')
export const setCustomerEmailRecognized = createAction('Set Customer email Recognized', ['customerEmailRecognized'])

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
    const formValues = getShippingFormValues(getState())
    return dispatch(checkoutSignIn(formValues))
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
        .then(() => {
            browserHistory.push({
                pathname: '/checkout/payment/'
            })
        })
}

export const checkCustomerEmail = () => (dispatch, getState) => {
    const formValues = getShippingFormValues(getState())

    return dispatch(checkCustomerEmailCommand(formValues.username))
        .then((emailAvailable) => {
            if (emailAvailable) {
                return dispatch(onShippingEmailAvailable())
            }
            return dispatch(onShippingEmailRecognized())
        })
}
