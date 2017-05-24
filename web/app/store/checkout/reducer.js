/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload, setCustomContent} from '../../utils/reducer-utils'
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
    [integrationManagerResults.receiveLocationsCustomContent]: (state, {payload}) => setCustomContent(state, payload, ['locations']),
    [integrationManagerResults.receiveShippingCustomContent]: (state, {payload}) => setCustomContent(state, payload, ['shipping']),
    [integrationManagerResults.receiveShippingAddressCustomContent]: (state, {payload}) => setCustomContent(state, payload, ['shipping', 'address']),
    [integrationManagerResults.receiveBillingCustomContent]: (state, {payload}) => setCustomContent(state, payload, ['billing']),
    [integrationManagerResults.receiveBillingAddressCustomContent]: (state, {payload}) => setCustomContent(state, payload, ['billing', 'address']),
    [setDefaultShippingAddressId]: mergePayload
}, Immutable.Map())

export default checkoutReducer
