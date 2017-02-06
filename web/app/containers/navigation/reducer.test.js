import reducer, {initialState} from './reducer'
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import * as appActions from '../app/actions'
import * as navActions from './actions'


describe('The navigation reducer', () => {

    test('should parse the navigation contents on page received', () => {
        const $content = jquerifyHtmlFile('app/containers/navigation/parsers/example.html')
        const newState = reducer(initialState, appActions.onPageReceived($, $content))
        // Parsers covered in their own tests
        expect(newState.get('root').size).toBeGreaterThan(0)
    })

    test('should open and close the nav', () => {
        expect(initialState.get('isOpen')).toBe(false)

        const openState = reducer(initialState, navActions.openNavigation())
        expect(openState.get('isOpen')).toBe(true)

        const closedState = reducer(initialState, navActions.closeNavigation())
        expect(closedState.get('isOpen')).toBe(false)
    })
})
