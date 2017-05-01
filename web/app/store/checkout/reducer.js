import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'
import * as integrationManagerResults from '../../integration-manager/checkout/results'

const productReducer = handleActions({
    [receiveCheckoutData]: mergePayload,
    [receiveShippingMethodInitialValues]: mergePayload,
    [integrationManagerResults.receiveShippingMethodInitialValues]: mergePayload,
    [integrationManagerResults.receiveCheckoutData]: mergePayload
}, Immutable.Map())

export default productReducer
