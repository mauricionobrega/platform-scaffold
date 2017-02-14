import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'

const initialState = Immutable.Map()

const productReducer = handleActions({
    ...mergePayloadForActions(receiveCheckoutData, receiveShippingMethodInitialValues)
}, initialState)

export default productReducer
