/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {urlToPathKey} from '../../utils/utils'

import * as appActions from './actions'
import {CURRENT_URL, FETCHED_PATHS} from './constants'

export const initialState = fromJS({
    pageVisitCount: 1,
    [CURRENT_URL]: window.location.href,
    notifications: [],
    fetchError: null,
    [FETCHED_PATHS]: {},
    sprite: ''
})

export default handleActions({
    [appActions.receiveData]: mergePayload,
    [appActions.onRouteChanged]: (state, {payload: {currentURL}}) => {
        return state.set(CURRENT_URL, currentURL)
    },
    [appActions.onPageReceived]: (state, {payload: {url}}) => {
        const path = urlToPathKey(url)
        return state.setIn([FETCHED_PATHS, path], true)
    },
    [appActions.addNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            // Don't allow duplicate notifications to be added
            return notifications.every(({id}) => id !== payload.id) ? notifications.push(payload) : notifications
        })
    },
    [appActions.removeNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            return notifications.filterNot(({id}) => id === payload)
        })
    },
    [appActions.removeAllNotifications]: (state) => {
        return state.set('notifications', List())
    },
    [appActions.setPageFetchError]: mergePayload,
    [appActions.clearPageFetchError]: (state) => {
        return state.set('fetchError', null)
    },
    [appActions.updateSvgSprite]: (state, {payload}) => {
        return state.set('sprite', payload.sprite)
    },
    [appActions.onPageVisitIncrement]: (state) => {
        return state.update('pageVisitCount', (count) => ++count)
    },
    [appActions.onPageVisitRehydration]: (state, {payload}) => {
        return state.update('pageVisitCount', (oldCount) => oldCount + payload)
    }
}, initialState)
