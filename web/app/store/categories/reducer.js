/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCategory, receiveCategoryInformation, receiveCategoryContents} from '../../integration-manager/categories/results'
import {changeFilter} from './actions'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    [receiveCategory]: mergePayload,
    [receiveCategoryInformation]: mergePayload,
    [receiveCategoryContents]: mergePayload,
    [changeFilter]: mergePayload,
}, initialState)

export default categoryReducer
