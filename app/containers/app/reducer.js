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
        messages: List(),
        itemAddedModalOpen: false
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
        let newState = state.updateIn(['clippy', 'messages'], (messages) => {
            const newMessages = messages.toJS().map((message) => {
                const newMessage = message

                if (message.url === payload.url) {
                    newMessage.product = payload.data
                }

                return newMessage
            })

            return List(newMessages)
        })

        newState = newState.setIn(['clippy', 'product'], payload.data)

        return newState
    },
    [appActions.openItemAddedModal]: (state) => {
        return state.setIn(['clippy', 'itemAddedModalOpen'], true)
    },
    [appActions.closeItemAddedModal]: (state) => {
        return state.setIn(['clippy', 'itemAddedModalOpen'], false)
    }
}, initialState)
