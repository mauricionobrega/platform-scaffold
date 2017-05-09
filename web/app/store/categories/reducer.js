/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCategory, changeFilter, changeSortOption} from './actions'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    [changeFilter]: mergePayload,
    [changeSortOption]: mergePayload,
    [receiveCategory]: mergePayload
}, initialState)

export default categoryReducer
