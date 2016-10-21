import reducer, {initialState} from './reducer'
import {onPageReceived} from '../app/actions'
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'

describe('The PLP reducer', () => {
    test('parses the page contents onPageReceived and updates the store', () => {
        const $content = jquerifyHtmlFile('app/containers/plp/parsers/plp.test.html')
        const newState = reducer(initialState, onPageReceived($, $content, 'PLP'))
        
        expect(newState).not.toBe(initialState)
    })

    test('does nothing for unknown action types', () => {
        const action = {type: 'qwertyuiop'}
        expect(reducer(initialState, action)).toBe(initialState)
    })
})
