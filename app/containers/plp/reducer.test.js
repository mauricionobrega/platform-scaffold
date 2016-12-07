import reducer, {initialState} from './reducer'
import {onPageReceived} from '../app/actions'
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {SELECTOR, PLACEHOLDER} from '../app/constants'
import {baseInitialState} from '../../utils/router-utils'
import {PLP} from './container'

describe('The PLP reducer', () => {
    const $content = jquerifyHtmlFile('app/containers/plp/parsers/plp.test.html')
    const untouchedState = baseInitialState.set(PLACEHOLDER, initialState)

    test('parses the page contents onPageReceived and updates the store', () => {
        const newState = reducer(untouchedState, onPageReceived($, $content, PLP))
        expect(newState).not.toBe(untouchedState)
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

        const oldState = reducer(untouchedState, onPageReceived($, $content, PLP, firstHref, firstHref))
        expect(oldState.has(firstHref)).toBeTruthy()
        expect(oldState.get(SELECTOR)).toBe(firstHref)

        // Mock changing the URL
        window.location.href = secondHref

        const newState = reducer(oldState, onPageReceived($, $content, PLP, secondHref, secondHref))
        expect(newState.has(secondHref)).toBeTruthy()
        expect(newState.get(SELECTOR)).toBe(secondHref)
    })

    test('does nothing for unknown action types', () => {
        const action = {type: 'qwertyuiop'}
        expect(reducer(untouchedState, action)).toBe(untouchedState)
    })
})
