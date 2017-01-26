import reducer, {initialState} from './reducer'
import {PLACEHOLDER} from '../app/constants'
import {baseInitialState} from '../../utils/router-utils'

describe('The PLP reducer', () => {
    const untouchedState = baseInitialState.set(PLACEHOLDER, initialState)

    test('does nothing for unknown action types', () => {
        const action = {type: 'qwertyuiop'}
        expect(reducer(untouchedState, action)).toBe(untouchedState)
    })
})
