/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveProductListProductData, receiveProductDetailsProductData} from './actions'

const initialState = Immutable.Map()

const productReducer = handleActions({
    [receiveProductDetailsProductData]: mergePayload,
    [receiveProductListProductData]: (state, {payload}) => {
        return state.mergeDeepWith((prev, next) => prev || next, payload)
    }
}, initialState)

export default productReducer
