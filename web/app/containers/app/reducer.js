/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'

import * as appActions from './actions'

import {receiveAppData, setPageFetchError, setCheckoutShippingURL, setCartURL, setLoggedIn, setCurrentURL} from '../../integration-manager/results'
import {CURRENT_URL, FETCHED_PATHS} from './constants'

export const initialState = fromJS({
    [CURRENT_URL]: window.location.href,
    notifications: [],
    fetchError: null,
    [FETCHED_PATHS]: {},
    sprite: ''
})

export default handleActions({
    [appActions.receiveData]: mergePayload,
    [appActions.setPageFetchError]: mergePayload,
    [receiveAppData]: mergePayload,
    [setPageFetchError]: mergePayload,
    [setCheckoutShippingURL]: mergePayload,
    [setCartURL]: mergePayload,
    [setCurrentURL]: mergePayload,
    [setLoggedIn]: mergePayload,
    [appActions.onRouteChanged]: (state, {payload: {currentURL}}) => {
        return state.set(CURRENT_URL, currentURL)
    },
    // Remove this reducer once we've fully converted to the integration manager
    [appActions.onPageReceived]: (state, {payload: {url}}) => {
        const path = urlToPathKey(url)
        return state.setIn([FETCHED_PATHS, path], true)
    },
    [appActions.setFetchedPage]: (state, {payload: {url}}) => {
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
    [appActions.clearPageFetchError]: (state) => {
        return state.set('fetchError', null)
    },
    [appActions.updateSvgSprite]: (state, {payload}) => {
        return state.set('sprite', payload.sprite)
    }
}, initialState)
