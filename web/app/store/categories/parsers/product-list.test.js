/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import productListParser from './product-list'

describe('the product list parser', () => {
    const $content = jquerifyHtmlFile('app/store/categories/parsers/product-list.test.html')
    const parsedContent = productListParser($, $content)

    it('should extract the product list content from the rendered HTML', () => {
        const expected = {
            hasProducts: true,
            contentsLoaded: true,
            noResultsText: '',
            itemCount: '7',
            title: 'Potions',
            productUrls: [
                'http://www.merlinspotions.com/eye-of-newt.html',
                'http://www.merlinspotions.com/unicorn-blood.html',
                'http://www.merlinspotions.com/aging-potion.html',
                'http://www.merlinspotions.com/aging-potion-1.html',
                'http://www.merlinspotions.com/aging-potion-2.html',
                'http://www.merlinspotions.com/aging-potion-3.html',
                'http://www.merlinspotions.com/aging-potion-4.html',
            ],
            sort: {name: 'sortSelect',
                options: [
                    {
                        key: 'position',
                        value: 'position',
                        selected: true,
                        text: 'Position',
                    },
                    {
                        key: 'name',
                        value: 'name',
                        selected: false,
                        text: 'Name',
                    },
                    {
                        key: 'price',
                        value: 'price',
                        selected: false,
                        text: 'Price',

                    }
                ]
            }
        }

        // Test that the shallow properties of the product list object are correct
        for (const key in parsedContent) {
            if (key !== 'products') {
                expect(parsedContent[key]).toEqual(expected[key])
            }
        }
    })
})
