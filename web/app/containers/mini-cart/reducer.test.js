import {Map} from 'immutable'

import reducer from './reducer'
import {receiveCartContents} from '../../store/cart/actions'

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

test('cartActions.receiveCartContents sets contentsLoaded flag', () => {
    const action = receiveCartContents({})

    const initialState = Map({
        contentsLoaded: false,
        bystander: 'data'
    })

    const finalState = Map({
        contentsLoaded: true,
        bystander: 'data'
    })

    expect(reducer(initialState, action).equals(finalState)).toBe(true)
})
