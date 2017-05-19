/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {createTypedAction} from '../../utils/utils'
import {LocationList} from './types'

export const receiveCheckoutLocations = createTypedAction('Receive Checkout Locations', LocationList, 'locations')

export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveShippingInitialValues = createAction('Receive Shipping Initial Values', ['shipping'])
export const receiveHasExistingCard = createAction('Receive Has Existing Cart flag', ['hasExistingCreditCard'])
export const receiveBillingInitialValues = createAction('Receive Billing Initial Values', ['billing'])
export const receiveCheckoutConfirmationData = createAction('Receive Checkout Confiramtion Data')
export const receiveUserEmail = createAction('Receive User Email Address', ['emailAddress'])
