import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveProductDetailsProductData} from '../../integration-manager/product-details/responses'
import {receiveProductListProductData} from './actions'

const initialState = Immutable.Map()

const productReducer = handleActions({
    ...mergePayloadForActions(receiveProductDetailsProductData),
    [receiveProductListProductData]: (state, {payload}) => {
        return state.mergeDeepWith((prev, next) => prev || next, payload)
    }
}, initialState)

export default productReducer
