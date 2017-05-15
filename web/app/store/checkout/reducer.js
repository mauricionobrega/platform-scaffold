/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import * as localActions from './actions'
import {
    receiveShippingMethodInitialValues,
    receiveCheckoutData,
    receiveCheckoutLocations,
    storeBillingAddress,
    receiveSavedShippingAddresses,
    receiveShippingMethods,
    receiveBillingInitialValues,
    receiveShippingInitialValues
} from '../../integration-manager/checkout/results'

import {setDefaultShippingAddressId} from './shipping/actions'

export default handleActions({
    [localActions.receiveCheckoutData]: mergePayload,
    [localActions.receiveSavedShippingAddresses]: mergePayload,
    [setDefaultShippingAddressId]: mergePayload,
    [receiveShippingMethodInitialValues]: mergePayload,
    [receiveCheckoutData]: mergePayload,
    [receiveCheckoutLocations]: mergePayload,
    [receiveSavedShippingAddresses]: mergePayload,
    [storeBillingAddress]: mergePayload,
    [receiveBillingInitialValues]: mergePayload,
    [receiveShippingInitialValues]: mergePayload,
    [receiveShippingMethods]: (state, {payload}) =>
        // Using `set` here will make sure the list in the store is
        // correctly truncated.
        state.set('shippingMethods', payload)
}, Immutable.Map())
