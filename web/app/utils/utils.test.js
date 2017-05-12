/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {createAction} from './utils'

test('createAction creates a multi-argument action creator if names are passed', () => {
    const actionCreator = createAction('Test Action', 'a', 'b', 'c')
    expect(typeof actionCreator).toBe('function')

    const action = actionCreator(1, 2, 3)
    expect(action).toEqual({
        type: 'Test Action',
        payload: {
            a: 1,
            b: 2,
            c: 3
        }
    })
})

test('createAction creates a single-argument action creator if no names are passed', () => {
    const actionCreator = createAction('Complete Test')
    expect(typeof actionCreator).toBe('function')

    const action = actionCreator('payload', 'ignored')
    expect(action).toEqual({
        type: 'Complete Test',
        payload: 'payload'
    })
})
