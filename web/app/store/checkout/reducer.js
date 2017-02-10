import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveShippingLocations, receiveShippingMethodInitialValues} from './actions'

const initialState = Immutable.Map()

const productReducer = handleActions({
    ...mergePayloadForActions(receiveShippingLocations, receiveShippingMethodInitialValues)
}, initialState)

export default productReducer
