import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {addNotification, removeNotification} from '../containers/app/actions'

export const receiveCheckoutShippingData = createAction('Receive Checkout Shipping data')
export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveHomeData = createAction('Receive Home Data')
export const receiveNavigationData = createAction('Receive Navigation Data')
export const receiveFooterData = createAction('Receive Footer Data')
export const receiveCategory = createAction('Receive Category Data')
export const setPageFetchError = createAction('Set page fetch error', ['fetchError'])
export const receiveAppData = createAction('Receive App Data')
export const setLoggedIn = createAction('Set Logged in flag', ['isLoggedIn'])
export const setNavigationAccountLink = createAction('Set Navigation Account Link Text')

export const onShippingEmailRecognized = () => {
    return (dispatch) => {
        dispatch(receiveCheckoutShippingData({customerEmailRecognized: true}))
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
