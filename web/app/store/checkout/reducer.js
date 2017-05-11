import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCheckoutData} from './actions'
import * as integrationManagerResults from '../../integration-manager/checkout/results'

const productReducer = handleActions({
    [receiveCheckoutData]: mergePayload,
    [integrationManagerResults.receiveBillingInitialValues]: mergePayload,
    [integrationManagerResults.receiveShippingInitialValues]: mergePayload,
    [integrationManagerResults.receiveCheckoutData]: mergePayload
}, Immutable.Map())

export default productReducer
