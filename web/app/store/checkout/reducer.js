import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveShippingLocations} from './actions'

const initialState = Immutable.Map()

const productReducer = handleActions({
    ...mergePayloadForActions(receiveShippingLocations)
}, initialState)

export default productReducer
