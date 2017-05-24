/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveSavedShippingAddresses} from './actions'
import * as integrationManagerResults from '../../integration-manager/checkout/results'
import {setDefaultShippingAddressId} from './shipping/actions'

const checkoutReducer = handleActions({
    [receiveSavedShippingAddresses]: mergePayload,
    [integrationManagerResults.receiveBillingInitialValues]: mergePayload,
    [integrationManagerResults.receiveShippingInitialValues]: mergePayload,
    [integrationManagerResults.receiveCheckoutData]: mergePayload,
    [integrationManagerResults.receiveUserEmail]: mergePayload,
    [integrationManagerResults.receiveCheckoutCustomContent]: mergePayload,
    [integrationManagerResults.receiveLocationsCustomContent]: (state, {payload}) => state.setIn(['locations', 'custom'], payload),
    [integrationManagerResults.receiveShippingCustomContent]: (state, {payload}) => state.setIn(['shipping', 'custom'], payload),
    [integrationManagerResults.receiveShippingAddressCustomContent]: (state, {payload}) => state.setIn(['shipping', 'address', 'custom'], payload),
    [setDefaultShippingAddressId]: mergePayload
}, Immutable.Map())

export default checkoutReducer
