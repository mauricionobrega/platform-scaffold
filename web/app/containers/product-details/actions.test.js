/* eslint-env jest */
import Immutable from 'immutable'
import * as fetchUtils from 'progressive-web-sdk/dist/utils/fetch-utils'

jest.mock('./')
import {addToCartStarted, submitCartForm} from './actions'

jest.mock('../../integration-manager/commands')
import {addToCart} from '../../integration-manager/commands'

/* eslint-disable import/namespace */

let realMakeFormEncodedRequest

beforeAll(() => {
    realMakeFormEncodedRequest = fetchUtils.makeFormEncodedRequest
    fetchUtils.makeFormEncodedRequest = jest.fn()
    fetchUtils.makeFormEncodedRequest.mockReturnValue(Promise.resolve())

    addToCart.mockImplementation(() => Promise.resolve())
})

afterAll(() => {
    fetchUtils.makeFormEncodedRequest = realMakeFormEncodedRequest
})

test('submitCartForm marks operation as in progress and adds to cart', () => {
    const submitCartFormThunk = submitCartForm()
    expect(typeof submitCartFormThunk).toBe('function')

    const getStore = () => ({
        ui: {
            app: Immutable.fromJS({currentURL: 'https://test.mobify.com/'}),
            productDetails: Immutable.fromJS({
                '/': {itemQuantity: 1}
            })
        }
    })

    const mockDispatch = jest.fn()
    mockDispatch.mockImplementation((...args) => args[0])

    submitCartFormThunk(mockDispatch, getStore).then(() => {
        expect(mockDispatch).toBeCalled()
        expect(mockDispatch.mock.calls[0][0]).toEqual(addToCartStarted())
        expect(mockDispatch.mock.calls[1][0]).toEqual(addToCart('/', 1))
    })
})

test('submitCartForm shows the "added to cart" modal if it succeeds', () => {

})
