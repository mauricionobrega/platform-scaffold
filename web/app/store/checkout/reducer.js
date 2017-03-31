import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'

const productReducer = handleActions({
    [receiveCheckoutData]: mergePayload,
    [receiveShippingMethodInitialValues]: mergePayload
}, Immutable.Map())

export default productReducer
