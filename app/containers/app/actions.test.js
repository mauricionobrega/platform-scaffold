import {fetchPage, onPageReceived, setPageFetchError, clearPageFetchError} from './actions'
import Immutable from 'immutable'
import {CURRENT_URL} from './constants'

let realFetch
beforeAll(() => {
    realFetch = global.fetch
    global.fetch = jest.fn()
    global.fetch.mockReturnValue(Promise.resolve())
})

afterAll(() => {
    global.fetch = realFetch
})

jest.mock('progressive-web-sdk/dist/jquery-response')
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

test('fetchPage fetches the given page', () => {
    const fakeGet = jest.fn()
    const response = {
        headers: {
            get: fakeGet
        }
    }

    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve(response))

    jqueryResponse.mockClear()
    jqueryResponse.mockReturnValue(['$', '$response'])

    const pageType = 'Home'
    const url = 'http://test.mobify.com/'

    const thunk = fetchPage(url, pageType, '/')
    expect(typeof thunk).toBe('function')

    const fakeDispatch = jest.fn()
    const getState = () => ({app: Immutable.fromJS({[CURRENT_URL]: 'test'})})

    return thunk(fakeDispatch, getState)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toBe(url)

            expect(fakeGet).toBeCalledWith('x-mobify-progressive')
            expect(jqueryResponse).toBeCalledWith(response)

            expect(fakeDispatch).toBeCalled()
            expect(fakeDispatch.mock.calls[0][0])
                .toEqual(clearPageFetchError())
            expect(fakeDispatch.mock.calls[1][0])
                .toEqual(onPageReceived('$', '$response', pageType, url, 'test', '/'))
        })
})

test('fetchPage dispatches fetchError if x-mobify-progressive === "offline"', () => {
    const fakeGet = jest.fn(() => 'offline')
    const response = {
        headers: {
            get: fakeGet
        }
    }

    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve(response))

    jqueryResponse.mockClear()
    jqueryResponse.mockReturnValue(['$', '$response'])

    const pageType = 'Home'
    const url = 'http://test.mobify.com/'

    const thunk = fetchPage(url, pageType, '/')
    expect(typeof thunk).toBe('function')

    const fakeDispatch = jest.fn()
    const getState = () => ({app: Immutable.fromJS({[CURRENT_URL]: 'test'})})

    return thunk(fakeDispatch, getState)
        .then(() => {
            expect(fakeGet).toBeCalledWith('x-mobify-progressive')
            expect(fakeDispatch.mock.calls[0][0])
            .toEqual(setPageFetchError({message: 'Failed to fetch, cached response provided'}))
        })
})

test('fetchPage does not throw on error', () => {
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.reject(new Error()))

    const thunk = fetchPage('url', 'pageType', '/')
    expect(typeof thunk).toBe('function')

    const fakeDispatch = jest.fn()
    const getState = () => ({app: Immutable.fromJS({[CURRENT_URL]: 'test'})})

    return thunk(fakeDispatch, getState)
        .catch(() => expect('The catch clause was called').toEqual('catch was not called'))
})
