/* eslint-disable import/namespace */
import {Map} from 'immutable'

import reducer from './reducer'
import {toggleEstimateShippingModal, toggleWishlistModal} from './actions'

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    const inputState = Map({
        test: true,
        item: false,
    })

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('cartActions.toggleEstimateShippingModal sets estimateShippingModal.isOpen flag', () => {
    const initialState = Map({
        estimateShippingModal: {
        },
        bystander: 'data'
    })

    const notOpenState = Map({
        estimateShippingModal: Map({
            isOpen: false
        }),
        bystander: 'data'
    })

    const openState = Map({
        estimateShippingModal: Map({
            isOpen: true
        }),
        bystander: 'data'
    })

    expect(reducer(initialState, toggleEstimateShippingModal(false)).equals(notOpenState)).toBe(true)
    expect(reducer(initialState, toggleEstimateShippingModal(true)).equals(openState)).toBe(true)
})

test('cartActions.toggleWishlistModal sets wishlistModal.isOpen flag', () => {
    const initialState = Map({
        bystander: 'data'
    })

    const notOpenState = Map({
        wishlistModal: Map({
            isOpen: false
        }),
        bystander: 'data'
    })

    const openState = Map({
        wishlistModal: Map({
            isOpen: true
        }),
        bystander: 'data'
    })

    expect(reducer(initialState, toggleWishlistModal(false)).equals(notOpenState)).toBe(true)
    expect(reducer(initialState, toggleWishlistModal(true)).equals(openState)).toBe(true)
})
