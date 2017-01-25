import {handleActions} from 'redux-actions'
import {Map, List} from 'immutable'

import * as appActions from './actions'
import {FETCH_IN_PROGRESS, CURRENT_URL} from './constants'

const initialState = Map({
    [FETCH_IN_PROGRESS]: false,
    [CURRENT_URL]: false,
        // If we use a regular array, React doesn't seem to catch all the updates
    notifications: List()
})

export default handleActions({
    [appActions.onRouteChanged]: (state, {payload: {currentURL}}) => {
        return state.set(FETCH_IN_PROGRESS, true).set(CURRENT_URL, currentURL)
    },
    [appActions.completeFetch]: (state) => {
        return state.set(FETCH_IN_PROGRESS, false)
    },
    [appActions.addNotification]: (state, {payload}) => {
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
    [appActions.removeNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            return notifications.filterNot((notification) => notification.id === payload)
        })
    },
    [appActions.removeAllNotifications]: (state) => {
        return state.set('notifications', List())
    }
}, initialState)
