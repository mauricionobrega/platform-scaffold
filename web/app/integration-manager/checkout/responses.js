import {createAction} from '../../utils/utils'

export const receiveCheckoutShippingData = createAction('Receive Checkout Shipping data')
export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', 'shipping')
