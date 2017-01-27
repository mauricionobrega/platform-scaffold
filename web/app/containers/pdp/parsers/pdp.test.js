import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import pdpParser from './pdp'

/* eslint-disable max-nested-callbacks */

describe('the PDP parser', () => {
    const $content = jquerifyHtmlFile('app/containers/pdp/parsers/pdp-example.html')
    const parsedContent = pdpParser($, $content)

    test('extracts form info from the add-to-cart form', () => {
        expect(isURL(parsedContent.formInfo.submitUrl)).toBe(true)
        expect(parsedContent.formInfo.method).toBe('post')
        Object.keys(parsedContent.formInfo.hiddenInputs).forEach((key) => {
            expect(typeof parsedContent.formInfo.hiddenInputs[key]).toBe('string')
        })
    })
})
