import reducer, {initialState} from './reducer'
import * as actions from './actions'
import * as appActions from '../app/actions'
import * as constants from './constants'
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'

describe('The Footer reducer', () => {

    test('parses the page contents with type ON_PAGE_RECEIVED', () => {
        const $content = jquerifyHtmlFile('app/containers/footer/parsers/footer-example.html')
        const newState = reducer(initialState, appActions.onPageReceived(null, $content))
        // Parsers covered in their own tests
        expect(newState.get('newsletter').size).toBeGreaterThan(0)
        expect(newState.get('navigation').size).toBeGreaterThan(0)
    })

    test('sets the signup status with type NEWSLETTER_SIGNUP_COMPLETE', () => {
        const status = constants.SIGNUP_SUCCESSFUL
        expect(initialState.get('signupStatus')).not.toEqual(status) // Sanity check
        const newState = reducer(initialState, actions.newsletterSignupComplete(status))
        expect(newState.get('signupStatus')).toEqual(status)
    })

    test('does nothing for unknown action types', () => {
        const action = {type: 'qwertyuiop'}
        expect(reducer(initialState, action)).toBe(initialState)
    })

})
