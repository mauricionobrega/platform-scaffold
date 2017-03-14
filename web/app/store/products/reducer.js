import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveProductDetailsProductData, receiveProductListProductData} from '../../integration-manager/products/responses'


const initialState = Immutable.Map()

const productReducer = handleActions({
    ...mergePayloadForActions(receiveProductDetailsProductData),
    [receiveProductListProductData]: (state, {payload}) => {
        return state.mergeDeepWith((prev, next) => prev || next, payload)
    }
}, initialState)

export default productReducer
