/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import loginParser from './signin'

describe('the Login parser', () => {
    const $content = jquerifyHtmlFile('app/containers/login/parsers/signin-example.html')
    const parsedContent = loginParser($, $content)

    test('extracts the title from the page', () => {
        expect(parsedContent.title).toBe('Customer Login')
    })

    test('extracts the heading from the page', () => {
        expect(parsedContent.heading).toBe('Registered Customers')
    })

    test('extracts the description from the page', () => {
        expect(typeof parsedContent.description).toBe('string')
    })

    test('extracts the href from the page', () => {
        expect(isURL(parsedContent.href)).toBe(true)
    })

    test('extracts the required text from the page', () => {
        expect(parsedContent.requiredText).toBe('* Required Fields')
    })

    test('extracts form info from the page', () => {
        const form = parsedContent.form
        expect(isURL(form.href)).toBe(true)
        expect(form.submitText).toBe('Login')
        expect(isURL(form.forgotPassword.href)).toBe(true)
        expect(form.forgotPassword.title).toBe('Forgot Your Password?')
        form.fields.forEach((field) => {
            expect(typeof field.label).toBe('string')
            expect(typeof field.name).toBe('string')
            expect(typeof field.type).toBe('string')
            expect(typeof field.required).toBe('boolean')
        })
        form.hiddenInputs.forEach((input) => {
            expect(typeof input.name).toBe('string')
            expect(typeof input.type).toBe('string')
            expect(typeof input.value).toBeDefined()
        })
    })
})
