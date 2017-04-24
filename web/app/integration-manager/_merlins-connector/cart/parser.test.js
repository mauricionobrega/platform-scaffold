/* eslint-env jquery, jest, node */
import {parseCart, parseCartProducts, parseCartHtml} from './parser'
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'

describe('Parsing the cart', () => {
    test('should map cart summary information to Cart type', () => {
        const data = require('./cart-contents-example.json')
        const expected = require('./cart-contents-parse-cart-expected.json')

        const cart = parseCart(data.cart)

        expect(cart).toEqual(expected)
    })
})

describe('Parsing the cart products', () => {
    test('should map cart product information to Product type', () => {
        const data = require('./cart-contents-example.json')
        const expected = require('./cart-contents-parse-cart-products-expected.json')

        const cartProducts = parseCartProducts(data.cart)

        expect(cartProducts).toEqual(expected)
    })
})

describe('Parsing the cart HTML', () => {
    test('should map to cart information and Products', () => {
        const $content = jquerifyHtmlFile(`${__dirname}/parser.test.html`)
        const output = parseCartHtml($, $content)

        const expected = {
            contents: [
                {
                    id: '1760',
                    productId: '3',
                    href: '/aging-potion.html',
                    quantity: 1
                },
                {
                    id: '1761',
                    productId: '9',
                    href: '/dragon-breeding-for-pleasure-and-profit.html',
                    quantity: 1
                },
                {
                    id: '1762',
                    productId: '10',
                    href: '/beginner-s-guide-to-transfiguration-2.html',
                    quantity: 1
                }
            ],
            subtotal: '$95.00',
            taxes: [{
                label: 'Tax',
                amount: '$4.75'
            }],
            orderTotal: '$99.75'
        }

        expect(output).toEqual(expected)
    })
})
