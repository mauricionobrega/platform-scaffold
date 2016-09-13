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

    expect(reducer(inputState, action)).toBe(inputState)
})

test('reducer implements all defined actions', () => {
    for (const action of Object.values(Actions)) {
        expect(reducer.has(action)).toBeTruthy()
    }
})
