import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const receiveCheckoutShippingData = createAction('Receive Checkout Shipping data')
export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', ['shipping'])
