/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import productDetailsParser from './product-details'

/* eslint-disable max-nested-callbacks */

describe('the ProductDetails parser', () => {
    const $content = jquerifyHtmlFile('app/containers/product-details/parsers/product-details-example.html')
    const parsedContent = productDetailsParser($, $content)

    test('extracts form info from the add-to-cart form', () => {
        expect(isURL(parsedContent.formInfo.submitUrl)).toBe(true)
        expect(parsedContent.formInfo.method).toBe('post')
        Object.keys(parsedContent.formInfo.hiddenInputs).forEach((key) => {
            expect(typeof parsedContent.formInfo.hiddenInputs[key]).toBe('string')
        })
    })
})
