import {createAction} from '../utils/utils'
import {addNotification, removeNotification} from '../containers/app/actions'


export const receivePdpProductData = createAction('Receive PDP product data')

export const receiveCheckoutShippingData = createAction('Receive Checkout Shipping data')

export const receiveCheckoutData = createAction('Receive Checkout Data')

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
