import {Map, fromJS} from 'immutable'

import reducer from './reducer'
import * as miniCartActions from './actions'
import {receiveCartContents} from '../cart/actions'


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

test('cartActions.receiveCartContents merges in its payload', () => {
    const action = receiveCartContents({
        title: 'Test',
        details: {
            detail1: 'one',
            detail2: 'two'
        }
    })

    const initialState = Map({
        bystander: 'data'
    })

    const finalState = fromJS({
        bystander: 'data',
        contentsLoaded: true,
        title: 'Test',
        details: {
            detail1: 'one',
            detail2: 'two'
        }
    })

    expect(reducer(initialState, action).equals(finalState)).toBe(true)
})
