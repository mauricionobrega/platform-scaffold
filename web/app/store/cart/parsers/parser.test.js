/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import parse from './parser'

describe('Parsing the cart contents', () => {

    test('should be able to parse the server response from the cart endpoint', () => {
        const responseStr = (require('./cart-contents-example.json'))
        const parsed = require('./cart-contents-parsed.json')
        expect(parse(responseStr)).toEqual(parsed)
    })

})
