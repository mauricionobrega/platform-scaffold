import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCheckoutData} from './actions'
import * as integrationManagerResponses from '../../integration-manager/checkout/responses'

const productReducer = handleActions({
    [receiveCheckoutData]: mergePayload,
    [integrationManagerResponses.receiveShippingMethodInitialValues]: mergePayload,
    [integrationManagerResponses.receiveCheckoutData]: mergePayload
}, Immutable.Map())

export default productReducer
