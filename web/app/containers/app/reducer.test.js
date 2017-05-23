/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
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
    const action = actions.onRouteChanged(testURL, 'home')

    expect(reducer(initialState, action).get(CURRENT_URL)).toBe(testURL)
})
