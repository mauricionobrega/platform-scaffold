import reducer, {initialState} from './reducer'
import * as actions from './actions'

describe('The Header reducer', () => {

    test('sets isCollapsed to true', () => {
        const status = true
        expect(initialState.get('isCollapsed')).not.toEqual(status) // Sanity check
        const newState = reducer(initialState, actions.shrinkHeader(status))
        expect(newState.get('isCollapsed')).toEqual(status)
    })

    test('sets isCollapsed to false', () => {
        const status = false
        const newState = reducer(initialState, actions.expandHeader(status))
        expect(newState.get('isCollapsed')).toEqual(status)
    })

})
