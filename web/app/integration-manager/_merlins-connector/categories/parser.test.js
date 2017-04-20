/* eslint-env jquery, jest, node*/
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import categoryProductsParser from './parser'

describe('the product list parser', () => {
    const $content = jquerifyHtmlFile(`${__dirname}/parser.test.html`)
    const parsedContent = categoryProductsParser($, $content)

    it('should extract the product list content from the rendered HTML', () => {
        const expected = {
            itemCount: 7,
            title: 'Potions',
            productUrls: [
                'http://www.merlinspotions.com/eye-of-newt.html',
                'http://www.merlinspotions.com/unicorn-blood.html',
                'http://www.merlinspotions.com/aging-potion.html',
                'http://www.merlinspotions.com/aging-potion-1.html',
                'http://www.merlinspotions.com/aging-potion-2.html',
                'http://www.merlinspotions.com/aging-potion-3.html',
                'http://www.merlinspotions.com/aging-potion-4.html',
            ]
        }

        // Test that the shallow properties of the product list object are correct
        for (const key in parsedContent) {
            if (key !== 'products') {
                expect(parsedContent[key]).toEqual(expected[key])
            }
        }
    })
})
