/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {fetchContents, receiveResponse} from './actions'

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
jest.mock('./checkout-payment-parser')
import checkoutPaymentParser from './checkout-payment-parser'

test('fetchContents dispatches receiveResponse, which dispatches receiveContents', () => {
    global.fetch.mockClear()
    global.fetch.mockReturnValueOnce(Promise.resolve('page contents!'))

    const url = 'http://test.mobify.com/'

    /**
     * We don't have the ability to change window.location.href, so we mock it
     * as a workaround
     * @url - https://github.com/tmpvar/jsdom#changing-the-url-of-an-existing-jsdom-window-instance
     * @url - https://github.com/facebook/jest/issues/890#issuecomment-209698782
     */
    Object.defineProperty(window.location, 'href', {
        writable: true,
        value: url
    })

    const thunk = fetchContents()
    expect(typeof thunk).toBe('function')

    const mockDispatch = jest.fn()

    return thunk(mockDispatch)
        .then(() => {
            expect(global.fetch).toBeCalled()
            expect(global.fetch.mock.calls[0][0]).toBe(url)

            expect(mockDispatch).toBeCalled()
        })
})

test('receiveResponse parses the response and dispatches receiveContents', () => {
    jqueryResponse.mockClear()
    jqueryResponse.mockReturnValue(Promise.resolve(['$', '$response']))

    const thunk = receiveResponse('page contents!')
    expect(typeof thunk).toBe('function')

    const mockDispatch = jest.fn()

    return thunk(mockDispatch)
        .then(() => {
            expect(jqueryResponse).toBeCalledWith('page contents!')

            expect(mockDispatch).toBeCalled()
            expect(checkoutPaymentParser).toBeCalledWith('$', '$response')
        })
})
