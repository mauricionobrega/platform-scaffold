import {Map} from 'immutable'

import reducer, {initialState} from './reducer'

import * as appActions from '../app/actions'
import * as pdpActions from './actions'

import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {SELECTOR, PLACEHOLDER} from '../app/constants'
import {baseInitialState} from '../../utils/router-utils'

const untouchedState = baseInitialState.set(PLACEHOLDER, initialState)
const $content = jquerifyHtmlFile('app/containers/pdp/parsers/pdp-example.html')

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

test('appActions.onPageReceived does nothing when pageType !== PDP', () => {
    const action = appActions.onPageReceived($, $content, 'Home')
    const inputState = Map()

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('appActions.onPageReceived causes the page to be parsed into the state', () => {
    const newState = reducer(untouchedState, appActions.onPageReceived($, $content, 'PDP'))
    expect(newState).not.toBe(untouchedState)
})

test('pdpActions.setItemQuantity sets the item quantity', () => {
    const action = pdpActions.setItemQuantity(5)
    const inputState = untouchedState.set(PLACEHOLDER, Map({itemQuantity: 2}))
    const newState = reducer(inputState, action)

    expect(newState.get(PLACEHOLDER).get('itemQuantity')).toBe(5)
})

test('stores pdp state using the current window.location.href as the key name', () => {
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

    const oldState = reducer(untouchedState, appActions.onPageReceived($, $content, 'PDP', firstHref, firstHref))
    expect(oldState.has(firstHref)).toBeTruthy()
    expect(oldState.get(SELECTOR)).toBe(firstHref)

    // Mock changing the URL
    window.location.href = secondHref

    const newState = reducer(oldState, appActions.onPageReceived($, $content, 'PDP', secondHref, secondHref))
    expect(newState.has(secondHref)).toBeTruthy()
    expect(newState.get(SELECTOR)).toBe(secondHref)
})
