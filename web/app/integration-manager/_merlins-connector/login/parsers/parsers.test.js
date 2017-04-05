/* eslint-env jquery, jest, node */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import {parseSigninHref, parseRegisterHref} from './parsers'

test('parseSigninHref gets the correct URL', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/signin-example.html`)
    const href = parseSigninHref($content)

    expect(isURL(href)).toBe(true)
    expect(href).toBe('http://www.merlinspotions.com/customer/account/loginPost/')
})

test('parseRegisterHref gets the correct URL', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/register-example.html`)
    const href = parseRegisterHref($content)

    expect(isURL(href)).toBe(true)
    expect(href).toBe('http://www.merlinspotions.com/customer/account/createpost/')
})
