import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'

const productReducer = handleActions({
    ...mergePayloadForActions(receiveCheckoutData, receiveShippingMethodInitialValues)
}, Immutable.Map())

export default productReducer
