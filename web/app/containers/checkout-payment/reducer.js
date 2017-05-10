/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as checkoutPaymentActions from './actions'
import {DEFAULT_CARD} from './constants'
import {mergePayload} from '../../utils/reducer-utils'

const initialState = Immutable.fromJS({
    isFixedPlaceOrderShown: true,
    hasExistingCreditCard: true,
    newShippingAddressIsEnabled: false,
    cvvType: DEFAULT_CARD
})

const checkoutPayment = handleActions({
    [checkoutPaymentActions.toggleFixedPlaceOrder]: mergePayload,
    [checkoutPaymentActions.toggleCardInputRadio]: mergePayload,
    [checkoutPaymentActions.toggleCompanyAptField]: mergePayload,
    [checkoutPaymentActions.toggleNewAddressFields]: mergePayload,
    [checkoutPaymentActions.setCvvType]: mergePayload
}, initialState)


export default checkoutPayment
