/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import registrationParser from './register'

describe('the Registration parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/register-example.html`)
    const href = registrationParser($content)

    test('extracts forms from the page', () => {
        expect(isURL(href)).toBe(true)
    })
})
