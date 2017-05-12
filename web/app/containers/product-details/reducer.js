/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as productDetailsActions from './actions'

import {mergePayload} from '../../utils/reducer-utils'

const reducer = handleActions({
    [productDetailsActions.addToCartStarted]: (state) => state.set('addToCartInProgress', true),
    [productDetailsActions.addToCartComplete]: (state) => state.set('addToCartInProgress', false),
    [productDetailsActions.receiveData]: mergePayload,
    [productDetailsActions.receiveNewItemQuantity]: mergePayload
}, Immutable.Map())

export default reducer
