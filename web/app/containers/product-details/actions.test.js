/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'

import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'

import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from './constants'
import {addToCartStarted, submitCartForm} from './actions'

jest.mock('../../integration-manager/cart/commands')
import {addToCart} from '../../integration-manager/cart/commands'

/* eslint-disable import/namespace */

describe('Add to Cart', () => {
    const mockDispatch = jest.fn()
    mockDispatch.mockImplementation((...args) => args[0])

    const getStore = () => ({
        ui: {
            app: Immutable.fromJS({currentURL: 'https://test.mobify.com/'}),
            productDetails: Immutable.fromJS({
                '/': {
                    itemQuantity: 1
                }
            })
        },
        products: Immutable.fromJS({
            '/': {
                variationOptions: undefined
            }
        })
    })

    beforeEach(() => {
        mockDispatch.mockClear()

        addToCart.mockReset()
        addToCart.mockImplementation(() => Promise.resolve())
    })

    test('submitCartForm marks operation as in progress and adds to cart', () => {
        const submitCartFormThunk = submitCartForm()
        expect(typeof submitCartFormThunk).toBe('function')

        submitCartFormThunk(mockDispatch, getStore).then(() => {
            expect(mockDispatch).toBeCalled()
            expect(mockDispatch.mock.calls[0][0]).toEqual(addToCartStarted())
            expect(mockDispatch.mock.calls[1][0]).toEqual(addToCart('/', 1))
        })
    })

    test('submitCartForm shows the "added to cart" modal if it succeeds', () => {
        const submitCartFormThunk = submitCartForm()

        return submitCartFormThunk(mockDispatch, getStore).then(() => {
            expect(mockDispatch).toHaveBeenCalledWith(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
        })
    })

    test('submitCartForm does not show the "added to cart" modal if it fails', () => {
        const submitCartFormThunk = submitCartForm()
        addToCart.mockReset()
        addToCart.mockImplementation(() => Promise.reject('Network error adding to cart'))

        return submitCartFormThunk(mockDispatch, getStore).then(() => {
            expect(mockDispatch).not.toHaveBeenCalledWith(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
        })
    })
})
