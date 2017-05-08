import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCheckoutData} from './actions'
import * as integrationManagerResults from '../../integration-manager/checkout/results'

const productReducer = handleActions({
    [receiveCheckoutData]: mergePayload,
    [integrationManagerResults.receiveShippingMethodInitialValues]: mergePayload,
    [integrationManagerResults.receiveCheckoutData]: mergePayload,
    [integrationManagerResults.receiveCheckoutLocations]: mergePayload,
    [integrationManagerResults.receiveShippingMethods]: (state, {payload}) =>
        // Using `set` here will make sure the list in the store is
        // correctly truncated.
        state.set('shippingMethods', payload)

}, Immutable.Map())

export default productReducer
