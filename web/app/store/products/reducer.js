import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveProductListProductData} from '../../integration-manager/responses'
import {receiveProductDetailsProductData} from '../../integration-manager/product-details/responses'


const initialState = Immutable.Map()

const productReducer = handleActions({
    ...mergePayloadForActions(receiveProductDetailsProductData),
    [receiveProductListProductData]: (state, {payload}) => {
        return state.mergeDeepWith((prev, next) => prev || next, payload)
    }
}, initialState)

export default productReducer
