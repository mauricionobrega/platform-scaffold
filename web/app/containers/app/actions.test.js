/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */

import {fetchPage, setPageFetchError, clearPageFetchError, checkIfOffline} from './actions'
import {closeModal} from '../../store/modals/actions'
import {OFFLINE_MODAL} from '../offline/constants'
import {OFFLINE_ASSET_URL} from './constants'

let realFetch
beforeAll(() => {
    realFetch = global.fetch
    global.fetch = jest.fn()
    global.fetch.mockReturnValue(Promise.resolve())
})

afterAll(() => {
    global.fetch = realFetch
})

test('checkIfOffline dispatches setPageFetchError if network request fails', () => {
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.reject(new TypeError('failed to fetch')))

    const fakeDispatch = jest.fn()
    const thunk = checkIfOffline()

    return thunk(fakeDispatch)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toBeCalled()
            expect(fakeDispatch.mock.calls[0][0]).toEqual(setPageFetchError('failed to fetch'))
        })
})

test('checkIfOffline dispatches setPageFetchError if it receives modified JSON from worker', () => {
    const mockResponse = {
        obj: {
            offline: true
        },
        json() {
            return this.obj
        }
    }

    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve(mockResponse))

    const fakeDispatch = jest.fn()
    const thunk = checkIfOffline()

    return thunk(fakeDispatch)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toHaveBeenCalledTimes(1)
            expect(fakeDispatch.mock.calls[0][0]).toEqual(setPageFetchError('Network failure, using worker cache'))
        })
})

test('checkIfOffline clears offline modal and page fetch errors when it receives untouched JSON from network', () => {
    const mockResponse = {
        obj: {},
        json() {
            return this.obj
        }
    }

    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve(mockResponse))

    const fakeDispatch = jest.fn()
    const thunk = checkIfOffline()

    return thunk(fakeDispatch)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toMatch(OFFLINE_ASSET_URL)

            expect(fakeDispatch).toHaveBeenCalledTimes(2)
            expect(fakeDispatch.mock.calls[0][0]).toEqual(clearPageFetchError())
            expect(fakeDispatch.mock.calls[1][0]).toEqual(closeModal(OFFLINE_MODAL))
        })
})

test('fetchPage does not throw on error', () => {
    const fetchError = new Error()
    fetchError.name = 'FetchError'
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.reject(fetchError))

    const thunk = fetchPage('url', 'pageType', '/')
    expect(typeof thunk).toBe('function')

    const fakeDispatch = jest.fn()

    return thunk(fakeDispatch)
        .catch(() => {
            expect('The catch clause was called').toEqual('catch was not called')
        })
        .then(() => {
            expect(fakeDispatch.mock.calls[0][0]).toEqual(setPageFetchError(''))
        })
})
