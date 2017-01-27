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
    }
}, initialState)
