import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receivePdpProductData, receiveProductListProductData} from '../../integration-manager/responses'

const initialState = Immutable.Map()

const productReducer = handleActions({
    ...mergePayloadForActions(receivePdpProductData),
    [receiveProductListProductData]: (state, {payload}) => {
        return state.mergeDeepWith((prev, next) => prev || next, payload)
    }
}, initialState)

export default productReducer
