/* eslint-env jest */
import Immutable from 'immutable'

import {addToCartStarted, addToCartComplete, openItemAddedModal, submitCartForm} from './actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from './constants'
import {openModal} from '../../store/modals/actions'

import * as utils from '../../utils/utils'

jest.mock('../../store/cart/actions')
import {getCart} from '../../store/cart/actions'

/* eslint-disable import/namespace */
let realMakeFormEncodedRequest
beforeAll(() => {
    realMakeFormEncodedRequest = utils.makeFormEncodedRequest
    utils.makeFormEncodedRequest = jest.fn()
    utils.makeFormEncodedRequest.mockReturnValue(Promise.resolve())
})

afterAll(() => {
    utils.makeFormEncodedRequest = realMakeFormEncodedRequest
})

test('submitCartForm makes a request and dispatches updates', () => {
    const thunk = submitCartForm()
    expect(typeof thunk).toBe('function')

    const getStore = () => ({
        ui: {
            app: Immutable.fromJS({currentURL: 'https://test.mobify.com/'}),
            productDetails: Immutable.fromJS({
                '/': {
                    contentsLoaded: true,
                    formInfo: {
                        method: 'POST',
                        hiddenInputs: {},
                        submitUrl: 'submitUrl'
                    },
                    itemQuantity: 1
                }
            })
        }
    })

    const mockDispatch = jest.fn()
    return thunk(mockDispatch, getStore)
        .then(() => {
            expect(utils.makeFormEncodedRequest).toBeCalledWith(
                'submitUrl',
                {qty: 1},
                {method: 'POST'})

            expect(mockDispatch).toBeCalled()
            expect(mockDispatch.mock.calls[0][0])
                .toEqual(addToCartStarted())
            expect(mockDispatch.mock.calls[1][0])
                .toEqual(addToCartComplete())
            expect(mockDispatch.mock.calls[2][0])
                .toEqual(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
            expect(getCart).toBeCalled()
        })
})
