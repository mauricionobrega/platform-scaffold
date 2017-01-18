import {createReducer} from 'redux-act'
import {Map, List} from 'immutable'

import * as appActions from './actions'
import {FETCH_IN_PROGRESS, CURRENT_URL} from './constants'

const initialState = Map({
    [FETCH_IN_PROGRESS]: false,
    [CURRENT_URL]: false,
        // If we use a regular array, React doesn't seem to catch all the updates
    notifications: List(),
    clippy: Map({
        messages: List()
    })
})

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
    [appActions.receiveMessageFromUser]: (state, payload) => {
        return state.updateIn(['clippy', 'messages'], (messages) => {
            return messages.push({
                from: 'user',
                text: payload
            })
        })
    },
    [appActions.receiveMessageFromClippy]: (state, payload) => {
        return state.updateIn(['clippy', 'messages'], (messages) => {
            return messages.push({
                from: 'clippy',
                text: payload.response,
                hasProduct: payload.isPDP,
                product: {},
                url: payload.redirectURL
            })
        })
    },
    [appActions.receiveProductInMessage]: (state, payload) => {
        return state.updateIn(['clippy', 'messages'], (messages) => {
            let newMessages = messages

            const messageToUpdate = messages.findIndex((message) => {
                return message.url === payload.url
            })

            if (messageToUpdate !== -1) {
                const message = newMessages.get(messageToUpdate)
                newMessages = newMessages.set(messageToUpdate, {
                    ...message,
                    product: payload.data
                })
            }

            return newMessages
        })
    }
}, initialState)
