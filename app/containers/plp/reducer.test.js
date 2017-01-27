import reducer from './reducer'
import {baseInitialState} from '../../utils/router-utils'

describe('The PLP reducer', () => {
    test('does nothing for unknown action types', () => {
        const action = {type: 'qwertyuiop'}
        expect(reducer(baseInitialState, action)).toBe(baseInitialState)
    })
})
