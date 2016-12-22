import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import pdpParser from './pdp'

/* eslint-disable max-nested-callbacks */

describe('the PDP parser', () => {
    const $content = jquerifyHtmlFile('app/containers/pdp/parsers/pdp-example.html')
    const parsedContent = pdpParser($, $content)

    test('extracts the title from the page', () => {
        expect(parsedContent.product.title).toBe('Eye Of Newt')
    })

    test('extracts the price from the page', () => {
        expect(parsedContent.product.price).toBe('$12.00')
    })

    test('extracts carousel items from the page', () => {
        const jsItems = parsedContent.product.carouselItems.toJS()
        expect(jsItems.length).toBe(3)

        jsItems.forEach((item, idx) => {
            ['thumb', 'img', 'full'].forEach((prop) => {
                expect(isURL(item[prop])).toBe(true)
                expect(item[prop]).toMatch(/\.png$/)
            })
            expect(item.position).toBe(`${idx + 1}`)
        })
    })

    test('extracts the description from the page', () => {
        expect(typeof parsedContent.product.description).toBe('string')
    })

    test('extracts form info from the add-to-cart form', () => {
        expect(isURL(parsedContent.formInfo.submitUrl)).toBe(true)
        expect(parsedContent.formInfo.method).toBe('post')
        Object.keys(parsedContent.formInfo.hiddenInputs).forEach((key) => {
            expect(typeof parsedContent.formInfo.hiddenInputs[key]).toBe('string')
        })
    })
})
