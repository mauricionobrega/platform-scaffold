/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveCheckoutCustomContent = createAction('Receive Checkout Custom Content', ['custom'])
export const receiveShippingInitialValues = createAction('Receive Shipping Initial Values', ['shipping'])
export const receiveHasExistingCard = createAction('Receive Has Existing Cart flag', ['hasExistingCreditCard'])
export const receiveBillingInitialValues = createAction('Receive Billing Initial Values', ['billing'])
export const receiveCheckoutConfirmationData = createAction('Receive Checkout Confiramtion Data')
export const receiveUserEmail = createAction('Receive User Email Address', ['emailAddress'])
export const receiveLocationsCustomContent = createAction('Receive Locations Custom Content')
export const receiveShippingCustomContent = createAction('Receive Shipping Custom Content')
export const receiveShippingAddressCustomContent = createAction('Receive Shipping Address Custom Content')
export const receiveBillingCustomContent = createAction('Receive Billing Custom Content')
export const receiveBillingAddressCustomContent = createAction('Receive Billing Address Custom Content')
export const receivePaymentCustomContent = createAction('Receive Payment Custom Content')
export const receivePaymentAddressCustomContent = createAction('Receive Payment Address Custom Content')