/* eslint-env jest */
import Immutable from 'immutable'
import * as fetchUtils from 'progressive-web-sdk/dist/utils/fetch-utils'

import {addToCartStarted, addToCartComplete, submitCartForm} from './actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from './constants'
import {openModal} from '../../store/modals/actions'

jest.mock('../../integration-manager/commands')
import {addToCart} from '../../integration-manager/commands'

jest.mock('../../store/cart/actions')
import {getCart} from '../../store/cart/actions'

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

test('submitCartForm makes a request and dispatches updates', () => {
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
        expect(mockDispatch.mock.calls[2][0]).toEqual(addToCartComplete())
        expect(mockDispatch.mock.calls[3][0]).toEqual(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
        expect(getCart).toBeCalled()
    })
})
