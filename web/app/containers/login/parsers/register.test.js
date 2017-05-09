/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import registrationParser from './register'

describe('the Registration parser', () => {
    const $content = jquerifyHtmlFile('app/containers/login/parsers/register-example.html')
    const parsedContent = registrationParser($, $content)

    const headings = ['Personal Information', 'Sign-in Information']

    test('extracts the href from the page', () => {
        expect(isURL(parsedContent.href)).toBe(true)
    })

    test('extracts forms from the page', () => {
        const form = parsedContent.form
        expect(isURL(form.href)).toBe(true)
        expect(form.submitText).toBe('Create an Account')
        form.sections.forEach((section) => {
            expect(headings.includes(section.heading)).toBe(true)
            section.fields.forEach((field) => { // eslint-disable-line max-nested-callbacks
                expect(typeof field.label).toBe('string')
                expect(typeof field.name).toBe('string')
                expect(typeof field.type).toBe('string')
                expect(typeof field.required).toBe('boolean')
            })
        })
        form.hiddenInputs.forEach((input) => {
            expect(typeof input.name).toBe('string')
            expect(typeof input.type).toBe('string')
            expect(typeof input.value).toBeDefined()
        })
    })
})
