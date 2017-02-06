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

jest.mock('progressive-web-sdk/dist/jquery-response')
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
jest.mock('./checkout-shipping-parser')
import checkoutShippingParser from './checkout-shipping-parser'


test('process parses the response and dispatches receiveData', () => {
    jqueryResponse.mockClear()
    jqueryResponse.mockReturnValue(Promise.resolve(['$', '$response']))

    const thunk = process('page contents!')
    expect(typeof thunk).toBe('function')

    const mockDispatch = jest.fn()

    return thunk(mockDispatch)
        .then(() => {
            expect(jqueryResponse).toBeCalledWith('page contents!')

            expect(mockDispatch).toBeCalled()
            expect(checkoutShippingParser).toBeCalledWith('$', '$response')
        })
})
