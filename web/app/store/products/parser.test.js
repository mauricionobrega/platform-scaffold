/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {productListParser} from './parser'

/* eslint-disable max-nested-callbacks */

describe('the ProductList product parser', () => {
    const $content = jquerifyHtmlFile('app/store/categories/parsers/product-list.test.html')
    const parsedContent = productListParser($, $content)

    it('should extract the product list content from the rendered HTML', () => {
        const urls = Object.keys(parsedContent)
        expect(urls.length).toBe(7)
        const expected = {
            productKeys: ['title', 'price', 'link', 'image', 'carouselItems'],
            imageKeys: ['title', 'alt', 'src']
        }
        // Test that the shallow properties of the product list object are correct
        urls.forEach((url) => {
            expect(Object.keys(parsedContent[url])).toEqual(expected.productKeys)
            expect(Object.keys(parsedContent[url].image)).toEqual(expected.imageKeys)
        })
    })
})
