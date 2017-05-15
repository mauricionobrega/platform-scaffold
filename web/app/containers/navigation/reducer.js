/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveNavigationData, setLoggedIn} from '../../integration-manager/results'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveData, setNavigationPath} from './actions'
import {SIGN_IN_LINK_TEXT, SIGN_OUT_LINK_TEXT, GUEST_NAV_ITEM_TYPE, SIGNED_IN_NAV_ITEM_TYPE} from './constants'

export const initialState = Immutable.fromJS({
    path: undefined,
    root: {},
})

export const reducer = handleActions({
    [receiveNavigationData]: mergePayload,
    [receiveData]: mergePayload,
    [setNavigationPath]: mergePayload,
    [setLoggedIn]: (state, {payload: {isLoggedIn}}) => {
        const accountNodePath = ['root', 'children', 0]

        // Don't create the navigation object if it doesn't exist already
        if (!state.hasIn(accountNodePath)) {
            return state
        }

        return state
            .setIn(
                [...accountNodePath, 'title'],
                isLoggedIn ? SIGN_OUT_LINK_TEXT : SIGN_IN_LINK_TEXT
            )
            .setIn(
                [...accountNodePath, 'type'],
                isLoggedIn ? SIGNED_IN_NAV_ITEM_TYPE : GUEST_NAV_ITEM_TYPE
            )
    }
}, initialState)

export default reducer
