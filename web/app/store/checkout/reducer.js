import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'
import {receiveCheckoutData as integrationManagerReceiveCheckoutData} from '../../integration-manager/responses'

const productReducer = handleActions({
    [receiveCheckoutData]: mergePayload,
    [receiveShippingMethodInitialValues]: mergePayload,
    [integrationManagerReceiveCheckoutData]: mergePayload
}, Immutable.Map())

export default productReducer
