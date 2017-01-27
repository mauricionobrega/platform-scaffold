import {Map} from 'immutable'

import reducer, {initialState} from './reducer'

import * as pdpActions from './actions'

import {PLACEHOLDER} from '../app/constants'
import {baseInitialState} from '../../utils/router-utils'

const untouchedState = baseInitialState.set(PLACEHOLDER, initialState)

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

test('pdpActions.setItemQuantity sets the item quantity', () => {
    const action = pdpActions.setItemQuantity(5)
    const inputState = untouchedState.set(PLACEHOLDER, Map({itemQuantity: 2}))
    const newState = reducer(inputState, action)

    expect(newState.get(PLACEHOLDER).get('itemQuantity')).toBe(5)
})
