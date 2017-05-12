/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {process} from './actions'

let realFetch
beforeAll(() => {
    realFetch = global.fetch
    global.fetch = jest.fn()
    global.fetch.mockReturnValue(Promise.resolve())
})

afterAll(() => {
    global.fetch = realFetch
})

jest.mock('./parsers/checkout-shipping')
import checkoutShippingParser from './parsers/checkout-shipping'


test('process parses the response and dispatches receiveData', () => {

    const thunk = process({payload: {$: '$', $response: '$response'}})
    expect(typeof thunk).toBe('object')
    expect(checkoutShippingParser).toBeCalledWith('$', '$response')
})
