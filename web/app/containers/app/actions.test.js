/* eslint-env jest */
import {fetchPage} from './actions'
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

// jest.mock('progressive-web-sdk/dist/jquery-response')
// import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

// test('fetchPage fetches the given page', () => {
//     global.fetch.mockClear()
//     global.fetch.mockReturnValueOnce(Promise.resolve('page contents!'))

//     jqueryResponse.mockClear()
//     jqueryResponse.mockReturnValue(['$', '$response'])

//     const pageType = 'Home'
//     const url = 'http://test.mobify.com/'

//     const thunk = fetchPage(url, pageType, '/')
//     expect(typeof thunk).toBe('function')

//     const fakeDispatch = jest.fn()
//     const getState = () => ({ui: {app: Immutable.fromJS({[CURRENT_URL]: 'test'})}})

//     return thunk(fakeDispatch, getState)
//         .then(() => {
//             expect(global.fetch).toBeCalled()
//             expect(global.fetch.mock.calls[0][0]).toBe(url)

//             expect(jqueryResponse).toBeCalledWith('page contents!')

//             expect(fakeDispatch).toBeCalled()
//             expect(fakeDispatch.mock.calls[0][0])
//                 .toEqual(onPageReceived('$', '$response', pageType, url, 'test', '/'))
//         })
// })

test('fetchPage does not throw on error', () => {
    const fetchError = new Error()
    fetchError.name = 'FetchError'
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.reject(fetchError))

    const thunk = fetchPage('url', 'pageType', '/')
    expect(typeof thunk).toBe('function')

    const fakeDispatch = jest.fn()
    const getState = () => ({ui: {app: Immutable.fromJS({[CURRENT_URL]: 'test'})}})

    return thunk(fakeDispatch, getState)
        .catch(() => expect('The catch clause was called').toEqual('catch was not called'))
})
