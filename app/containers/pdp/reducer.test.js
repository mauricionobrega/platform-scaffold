/* eslint-disable import/namespace */
import {Map} from 'immutable'

import reducer from './reducer'
import * as Actions from './actions'

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

test('reducer implements all defined actions', () => {
    for (const action in Actions) {
        if (Actions.hasOwnProperty(action)) {
            expect(reducer.has(Actions[action])).toBe(true)
        }
    }
})
