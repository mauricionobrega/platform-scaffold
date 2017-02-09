/* eslint-env jest */
/* eslint-disable import/namespace */
import {Map} from 'immutable'

import reducer from './reducer'
import {receiveContents} from './actions'

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

test('checkoutPaymentActions.receiveContents sets contentsLoaded flag', () => {
    const action = receiveContents({})

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
