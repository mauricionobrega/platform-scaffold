/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', ['shipping'])
export const receiveCheckoutConfirmationData = createAction('Receive Checkout Confiramtion Data')
