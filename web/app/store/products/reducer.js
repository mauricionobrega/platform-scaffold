/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {
    receiveProductDetailsProductData,
    receiveProductListProductData,
    receiveCartProductData
} from '../../integration-manager/products/results'

const initialState = Immutable.Map()

const mergeWithoutOverwriting = (state, {payload}) => state.mergeDeepWith((prev, next) => prev || next, payload)

const productReducer = handleActions({
    [receiveProductDetailsProductData]: mergePayload,
    [receiveProductListProductData]: mergeWithoutOverwriting,
    [receiveCartProductData]: mergeWithoutOverwriting
}, initialState)

export default productReducer
