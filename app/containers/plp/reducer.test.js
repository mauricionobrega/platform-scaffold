import reducer, {initialState} from './reducer'
import {onPageReceived} from '../app/actions'
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'

describe('The PLP reducer', () => {
    const $content = jquerifyHtmlFile('app/containers/plp/parsers/plp.test.html')

    test('parses the page contents onPageReceived and updates the store', () => {
        const newState = reducer(initialState, onPageReceived($, $content, 'PLP'))

        expect(newState).not.toBe(initialState)
    })

    test('stores plp state using the current window.location.href as the key name', () => {
        const firstHref = 'http://www.foo.com/'
        const secondHref = 'http://www.foo.com/home.html'

        /**
         * We don't have the ability to change window.location.href, so we mock it
         * as a workaround
         * @url - https://github.com/tmpvar/jsdom#changing-the-url-of-an-existing-jsdom-window-instance
         * @url - https://github.com/facebook/jest/issues/890#issuecomment-209698782
         */
        Object.defineProperty(window.location, 'href', {
            writable: true,
            value: firstHref
        })

        const oldState = reducer(initialState, onPageReceived($, $content, 'PLP', firstHref))
        expect(oldState.has(firstHref)).toBeTruthy()

        // Mock changing the URL
        window.location.href = secondHref

        const newState = reducer(initialState, onPageReceived($, $content, 'PLP', secondHref))
        expect(newState.has(secondHref)).toBeTruthy()
    })

    test('does nothing for unknown action types', () => {
        const action = {type: 'qwertyuiop'}
        expect(reducer(initialState, action)).toBe(initialState)
    })
})
