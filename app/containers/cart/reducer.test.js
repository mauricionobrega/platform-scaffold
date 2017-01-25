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
