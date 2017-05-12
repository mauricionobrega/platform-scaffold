/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {createTypedAction} from '../../utils/utils'
import {Address, LocationList, ShippingMethods} from './types'

export const receiveCheckoutLocations = createTypedAction('Receive Checkout Locations', LocationList, 'locations')
export const receiveShippingMethods = createTypedAction('Receive Shipping Methods', ShippingMethods)
export const storeBillingAddress = createTypedAction('Store Billing Address', Address, 'billingAddress')

export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', ['shipping'])
export const receiveCheckoutConfirmationData = createAction('Receive Checkout Confiramtion Data')
