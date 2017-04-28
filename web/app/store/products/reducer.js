import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveProductListProductData, receiveProductDetailsProductData, receiveSearchResultProductData} from './actions'

const initialState = Immutable.Map()

const productReducer = handleActions({
    [receiveProductDetailsProductData]: mergePayload,
    [receiveProductListProductData]: (state, {payload}) => {
        return state.mergeDeepWith((prev, next) => prev || next, payload)
    },
    [receiveSearchResultProductData]: (state, {payload}) => {
        return state.mergeDeepWith((prev, next) => prev || next, payload)
    }
}, initialState)

export default productReducer
