import {createReducer} from 'redux-act'
import {Map, List} from 'immutable'

import * as appActions from './actions'
import {FETCH_IN_PROGRESS, CURRENT_URL} from './constants'

const initialState = Map({
    [FETCH_IN_PROGRESS]: false,
    [CURRENT_URL]: false,
        // If we use a regular array, React doesn't seem to catch all the updates
    notifications: List(),
    fetchError: null
})

// This will need to become more complicated when
// we handle more types of errors, but will do for now
export const isOffline = (state) => !!state.app.get('fetchError')

export default createReducer({
    [appActions.onRouteChanged]: (state, {currentURL}) => {
        return state.set(FETCH_IN_PROGRESS, true).set(CURRENT_URL, currentURL)
    },
    [appActions.onPageReceived]: (state) => {
        return state.set(FETCH_IN_PROGRESS, false)
    },
    [appActions.addNotification]: (state, payload) => {
        return state.update('notifications', (notifications) => {
            // Don't allow duplicate notifications to be added
            const existingNotification = notifications.find((notification) => {
                return notification.id === payload.id
            })

            if (existingNotification) {
                return notifications
            } else {
                return notifications.push(payload)
            }
        })
    },
    [appActions.removeNotification]: (state, payload) => {
        return state.update('notifications', (notifications) => {
            return notifications.filterNot((notification) => notification.id === payload)
        })
    },
    [appActions.removeAllNotifications]: (state) => {
        return state.set('notifications', List())
    },
    [appActions.setPageFetchError]: (state, payload) => {
        return state.mergeDeep(payload)
    },
    [appActions.clearPageFetchError]: (state) => {
        return state.set('fetchError', null)
    }
}, initialState)
