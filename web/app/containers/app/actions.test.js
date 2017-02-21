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

// jest.mock('progressive-web-sdk/dist/jquery-response')
// import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

// const getState = () => ({ui: {app: Immutable.fromJS({[CURRENT_URL]: '/'})}})
// const URL = 'http://test.mobify.com/'

// test('fetchPage fetches the given page', () => {
//     global.fetch.mockClear()
//     global.fetch.mockReturnValueOnce(Promise.resolve('page contents!'))

//     jqueryResponse.mockClear()
//     jqueryResponse.mockReturnValue(['$', '$response'])

//     const fakeDispatch = jest.fn()
//     const thunk = fetchPage(URL, null, 'home')

//     return thunk(fakeDispatch, getState)
//         .then(() => {
//             expect(global.fetch).toBeCalled()
//             expect(global.fetch.mock.calls[0][0]).toBe(URL)

//             expect(jqueryResponse).toBeCalledWith('page contents!')

//             expect(fakeDispatch).toBeCalled()
//             expect(fakeDispatch.mock.calls[1][0])
//                 .toEqual(onPageReceived('$', '$response', URL, '/', 'home'))
//         })
// })

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
        json: function() { // eslint-disable-line object-shorthand
                           // arrow function won't properly bind `this`
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
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.reject(new Error()))

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
