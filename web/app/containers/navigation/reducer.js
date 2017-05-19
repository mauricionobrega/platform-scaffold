/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveNavigationData, setLoggedIn} from '../../integration-manager/results'
import {mergePayload} from '../../utils/reducer-utils'
import {setNavigationPath} from './actions'
import {LOGGED_IN_NAV, GUEST_NAV} from './constants'

export const initialState = Immutable.fromJS({
    path: undefined,
    root: {},
})

export const reducer = handleActions({
    [receiveNavigationData]: mergePayload,
    [setNavigationPath]: mergePayload,
    [setLoggedIn]: (state, {payload: {isLoggedIn}}) => {
        const accountNodePath = ['root', 'children', 0]

        // Don't create the navigation object if it doesn't exist already
        if (!state.hasIn(accountNodePath)) {
            return state
        }

        return state.mergeDeepIn(accountNodePath, isLoggedIn ? LOGGED_IN_NAV : GUEST_NAV)
    }
}, initialState)

export default reducer
