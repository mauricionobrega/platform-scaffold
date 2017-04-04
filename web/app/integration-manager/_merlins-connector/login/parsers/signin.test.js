/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import loginParser from './signin'

describe('the Login parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/signin-example.html`)
    const parsedContent = loginParser($, $content)

    test('extracts form info from the page', () => {
        const form = parsedContent.form
        expect(isURL(form.href)).toBe(true)
        expect(isURL(form.forgotPassword.href)).toBe(true)
        expect(form.forgotPassword.title).toBe('Forgot Your Password?')
        form.fields.forEach((field) => {
            expect(typeof field.label).toBe('string')
            expect(typeof field.name).toBe('string')
            expect(typeof field.type).toBe('string')
            expect(typeof field.required).toBe('boolean')
        })
    })
})
