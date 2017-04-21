/* eslint-env jest */
import {parseCart, parseCartProducts} from './parser'

describe('Parsing the cart', () => {
    test('should map cart summary information to Cart type', () => {
        const data = require('./cart-contents-example.json')
        const cart = parseCart(data.cart)

        expect(cart).toEqual({
            contents: [
                {
                    href: 'https://www.merlinspotions.com/sleeping-draught.html',
                    id: '1659',
                    productId: '7',
                    quantity: 1,
                }, {
                    href: 'https://www.merlinspotions.com/eye-of-newt.html',
                    id: '1658',
                    productId: '1',
                    quantity: 2,
                }
            ],
            subtotalWithoutTax: '$48.00',
            subtotalWithTax: '$50.40',
            taxes: []
        })
    })
})

describe('Parsing the cart products', () => {
    const data = require('./cart-contents-example.json')
    console.log(data.cart)
    const cartProducts = parseCartProducts(data.cart)

    /* eslint-disable max-len */
    expect(cartProducts).toEqual({
        '/sleeping-draught.html': {
            id: '7',
            title: 'Sleeping Draught',
            href: 'https://www.merlinspotions.com/sleeping-draught.html',
            price: '$24.00',
            thumbnail: {
                src: 'https://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/s/l/sleeping-draught-1.jpg',
                alt: 'Sleeping Draught',
                width: '75px',
                height: '75px'
            }
        },
        '/eye-of-newt.html': {
            id: '1',
            title: 'Eye Of Newt',
            href: 'https://www.merlinspotions.com/eye-of-newt.html',
            price: '$12.00',
            thumbnail: {
                src: 'https://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/e/y/eye-of-newt-1.jpg',
                alt: 'Eye Of Newt',
                width: '75px',
                height: '75px'
            }
        }
    })
    /* eslint-enable max-len */
})
