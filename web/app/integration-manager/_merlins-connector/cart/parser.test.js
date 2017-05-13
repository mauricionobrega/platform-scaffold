/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest, node */
import {parseCart, parseCartProducts} from './parser'

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

// @TODO add test for parseCartTotals
describe('Parsing the cart totals', () => {
    test('should map the cart totals based on somethign soemthign', () => {
        // const data = require('./cart-contents-example.json')
        // const expected = require('./cart-contents-parse-cart-products-expected.json')
        //
        // const cartProducts = parseCartProducts(data.cart)
        //
        // expect(cartProducts).toEqual(expected)
        throw Error('create test for parseCartTotals')
    })
})
