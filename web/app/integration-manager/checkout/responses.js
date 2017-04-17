import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const receiveCheckoutShippingData = createAction('Receive Checkout Shipping data')
export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveShippingInitialValues = createAction('Receive Shipping Initial Values', ['shipping'])
export const receiveHasExistingCard = createAction('Receive Has Existing Cart flag', ['hasExistingCreditCard'])
export const receiveBillingInitialValues = createAction('Receive Billing Initial Values', ['billing'])
