/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'
import reducer, {initialState} from './reducer'
import * as actions from './actions'
import {CURRENT_URL} from './constants'

/* eslint-disable newline-per-chained-call */

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    expect(reducer(initialState, action)).toEqual(initialState)
})

test('onRouteChanged changes the current URL', () => {
    const testURL = 'https://test.mobify.com/'
    const action = actions.onRouteChanged(testURL)

    expect(reducer(initialState, action).get(CURRENT_URL)).toBe(testURL)
})

test('addNotification adds a notification', () => {
    const notification = {id: 'test', value: 1}
    const action = actions.addNotification(notification)

    expect(reducer(initialState, action).get('notifications').equals(Immutable.List([notification])))
        .toBe(true)
})

test('addNotification will not add duplicate notifications', () => {
    const inputState = initialState.set('notifications', Immutable.List([{id: 5}]))
    const action = actions.addNotification({id: 5, duplicate: true})

    expect(reducer(inputState, action)).toBe(inputState)
})

test('removeNotification removes a particular notification', () => {
    const notifications = [{id: 1}, {id: 2}, {id: 3}]

    const inputState = initialState.set('notifications', Immutable.List(notifications))
    const action = actions.removeNotification(2)
    const outputState = initialState.set('notifications', Immutable.List([
        notifications[0],
        notifications[2]
    ]))

    expect(reducer(inputState, action).equals(outputState)).toBe(true)
})

test('removeAllNotifications removes all notifications', () => {
    const inputState = initialState.set('notifications', Immutable.List([
        {id: 1},
        {id: 2},
        {id: 3}
    ]))
    const action = actions.removeAllNotifications()

    expect(reducer(inputState, action).equals(initialState)).toBe(true)
})
