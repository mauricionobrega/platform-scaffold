/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'

import {receiveData} from './actions'

const CATEGORY_PLACEHOLDER_COUNT = 6

const initialState = fromJS({
    categories: new Array(CATEGORY_PLACEHOLDER_COUNT).fill({}),
    banners: []
})

export default handleActions({
    [receiveData]: mergePayload
}, initialState)
