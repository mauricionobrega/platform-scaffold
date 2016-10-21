import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import plpParser from './plp'

describe('the plp parser', () => {
    const $content = jquerifyHtmlFile('app/containers/plp/parsers/plp.test.html')
    const parsedContent = plpParser($, $content)

    test('should extract the plp content from the rendered HTML', () => {
        const expected = {
            hasProducts: true,
            noResultsText: '',
            numItems: '7',
            title: 'Potions',
            productKeys: ['href', 'image', 'name', 'price'],
            imageKeys: ['alt', 'src']
        }

        // Test that the shallow properties of the plp object are correct
        for (let key in parsedContent) {
            if (key !== 'products') {
                expect(parsedContent[key]).toEqual(expected[key])
            }
        }

        // Test that the product keys are all there
        parsedContent.products.forEach((product) => {
            expect(Object.keys(product)).toEqual(expected.productKeys)
            expect(Object.keys(product.image)).toEqual(expected.imageKeys)
        })
    })
})
