/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import registrationParser from './register'

describe('the Registration parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/register-example.html`)
    const form = registrationParser($, $content)

    const headings = ['Personal Information', 'Sign-in Information']

    test('extracts forms from the page', () => {
        expect(isURL(form.href)).toBe(true)
        form.sections.forEach((section) => {
            expect(headings.includes(section.heading)).toBe(true)
        })
    })
})
