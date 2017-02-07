import {createAction} from '../../utils/utils'
import checkoutShippingParser from './checkout-shipping-parser'
import {addNotification} from '../app/actions'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')

export const receiveData = createAction('Receive Checkout Shipping Data')
export const process = ({payload: {$, $response}}) => {
    return receiveData(checkoutShippingParser($, $response))
}

export const onShippingEmailRecognized = () => {
    return (dispatch) => {
        dispatch(addNotification({
            content: `Welcome back! Sign in for a faster checkout or continue as a guest.`,
            id: 'shippingWelcomeBackMessage',
            showRemoveButton: true
        }))
    }
}
