/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues, receiveSavedShippingAddresses} from './actions'
import {setDefaultShippingAddressId} from './shipping/actions'

const productReducer = handleActions({
    [receiveCheckoutData]: mergePayload,
    [receiveSavedShippingAddresses]: mergePayload,
    [receiveShippingMethodInitialValues]: mergePayload,
    [setDefaultShippingAddressId]: mergePayload,
}, Immutable.Map())

export default productReducer
