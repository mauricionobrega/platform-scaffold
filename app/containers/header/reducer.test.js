import reducer, {initialState} from './reducer'
import * as actions from './actions'

describe('The Header reducer', () => {

    test('toggles the header content', () => {
        let newState
        expect(initialState.get('isCollapsed')).toEqual(false) // Sanity check

        // First Toggle
        newState = reducer(initialState, actions.toggleHeader())
        expect(newState.get('isCollapsed')).toEqual(true)

        // Second Toggle
        newState = reducer(newState, actions.toggleHeader())
        expect(newState.get('isCollapsed')).toEqual(false)
    })

})
