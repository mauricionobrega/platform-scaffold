/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import loginParser from './signin'

describe('the Login parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/signin-example.html`)
    const form = loginParser($, $content)

    test('extracts form info from the page', () => {
        expect(isURL(form.href)).toBe(true)
        expect(isURL(form.forgotPassword.href)).toBe(true)
        expect(form.forgotPassword.title).toBe('Forgot Your Password?')
    })
})
