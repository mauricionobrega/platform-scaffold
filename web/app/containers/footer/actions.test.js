/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {signUpToNewsletter, newsletterSignupComplete} from './actions'
import {SIGNUP_SUCCESSFUL, SIGNUP_FAILED} from './constants'

let realFetch
beforeAll(() => {
    realFetch = global.fetch
    global.fetch = jest.fn()
})

afterAll(() => {
    global.fetch = realFetch
})

test('signUpToNewsletter submits the form and dispatches the success action on success', () => {
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve())

    const thunk = signUpToNewsletter('/test-form', 'POST', {thing: 'test'})
    expect(typeof thunk).toBe('function')

    const mockDispatch = jest.fn()
    return thunk(mockDispatch)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toBe('/test-form')
            expect(global.fetch.mock.calls[0][1].method).toBe('POST')
            expect(global.fetch.mock.calls[0][1].body).toBe('thing=test')

            expect(mockDispatch).toBeCalled()
            expect(mockDispatch.mock.calls[0][0]).toEqual(newsletterSignupComplete(SIGNUP_SUCCESSFUL))
        })
})

test('signUpToNewsletter submits the form and dispatches the failure action on failure', () => {
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.reject())

    const thunk = signUpToNewsletter('/test-form', 'POST', {thing: 'test'})
    expect(typeof thunk).toBe('function')

    const mockDispatch = jest.fn()
    return thunk(mockDispatch)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toBe('/test-form')
            expect(global.fetch.mock.calls[0][1].method).toBe('POST')
            expect(global.fetch.mock.calls[0][1].body).toBe('thing=test')

            expect(mockDispatch).toBeCalled()
            expect(mockDispatch.mock.calls[0][0]).toEqual(newsletterSignupComplete(SIGNUP_FAILED))
        })
})
