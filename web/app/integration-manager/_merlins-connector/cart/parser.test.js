/* eslint-env jest */
import parse from './parser'

describe('Parsing the cart contents', () => {

    test('should be able to parse the server response from the cart endpoint', () => {
        const responseJSON = (require('./cart-contents-example.json'))
        const parsed = require('./cart-contents-parsed.json')
        expect(parse(JSON.stringify(responseJSON))).toEqual(parsed)
    })

})
