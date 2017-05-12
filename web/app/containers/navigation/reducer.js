/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveData} from './actions'
import {mergePayload} from '../../utils/reducer-utils'
export const initialState = Immutable.fromJS({
    path: undefined,
    root: {},
})


export const reducer = handleActions({
    [receiveData]: mergePayload
}, initialState)


export default reducer
