/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveNavigationData, setLoggedIn} from '../../integration-manager/results'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveData, setNavigationPath} from './actions'
import {SIGN_IN_LINK_TEXT, ACCOUNT_LINK_TEXT} from './constants'

export const initialState = Immutable.fromJS({
    path: undefined,
    root: {},
})

const ACCOUNT_TITLE_PATH = ['root', 'children', 0, 'title']

export const reducer = handleActions({
    [receiveNavigationData]: mergePayload,
    [receiveData]: mergePayload,
    [setNavigationPath]: mergePayload,
    [setLoggedIn]: (state, {payload: {isLoggedIn}}) => {
        // Don't try to replace stuff if it's empty
        if (!state.hasIn(ACCOUNT_TITLE_PATH)) {
            return state
        }
        return state.setIn(
            ACCOUNT_TITLE_PATH,
            isLoggedIn ? ACCOUNT_LINK_TEXT : SIGN_IN_LINK_TEXT
        )
    }
}, initialState)


export default reducer
