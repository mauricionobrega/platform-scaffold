/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import {isURL} from 'validator'
import {productDetailsParser, productListParser} from './parser'

/* eslint-disable max-nested-callbacks */

describe('the ProductDetails product parser', () => {
    const $content = jquerifyHtmlFile('app/containers/product-details/parsers/product-details-example.html')
    const parsedContent = productDetailsParser($, $content)

    it('extracts the title from the page', () => {
        expect(parsedContent.title).toBe('Eye Of Newt')
    })

    it('extracts the price from the page', () => {
        expect(parsedContent.price).toBe('$12.00')
    })

    it('extracts carousel items from the page', () => {
        const items = parsedContent.carouselItems
        expect(items.length).toBe(3)

        items.forEach((item, idx) => {
            ['thumb', 'img', 'full'].forEach((prop) => {
                expect(isURL(item[prop])).toBe(true)
                expect(item[prop]).toMatch(/\.png$/)
            })
            expect(item.position).toBe(`${idx + 1}`)
        })
    })

    it('extracts the description from the page', () => {
        expect(typeof parsedContent.description).toBe('string')
    })
})

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
