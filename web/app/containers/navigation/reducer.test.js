import reducer, {initialState} from './reducer'

describe('The navigation reducer', () => {
    test('should not modify the state on an unknown action type', () => {
        expect(reducer(initialState, {type: 'uuddlrlrabstart'})).toBe(initialState)
    })
})
