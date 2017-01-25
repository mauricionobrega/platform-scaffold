import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'

import * as appActions from './actions'
import {CURRENT_URL} from './constants'

const initialState = fromJS({
    [CURRENT_URL]: false,
    notifications: []
})

export default handleActions({
    [appActions.onRouteChanged]: (state, {payload: {currentURL}}) => {
        return state.set(CURRENT_URL, currentURL)
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
