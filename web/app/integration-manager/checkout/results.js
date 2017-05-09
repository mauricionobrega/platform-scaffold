import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveHasExistingCard = createAction('Receive Has Existing Cart flag', ['hasExistingCreditCard'])
export const receiveBillingInitialValues = createAction('Receive Billing Initial Values', ['billing'])
export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', ['shipping'])
export const receiveCheckoutConfirmationData = createAction('Receive Checkout Confiramtion Data')
