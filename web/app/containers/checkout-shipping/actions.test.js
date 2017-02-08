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

jest.mock('./checkout-shipping-parser')
import checkoutShippingParser from './checkout-shipping-parser'


test('process parses the response and dispatches receiveData', () => {

    const thunk = process({payload: {$: '$', $response: '$response'}})
    expect(typeof thunk).toBe('object')
    expect(checkoutShippingParser).toBeCalledWith('$', '$response')
})
