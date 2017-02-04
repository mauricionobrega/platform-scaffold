/* eslint-env jquery */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import plpParser from './plp'

describe('the plp parser', () => {
    const $content = jquerifyHtmlFile('app/store/categories/parsers/plp.test.html')
    const parsedContent = plpParser($, $content)

    it('should extract the plp content from the rendered HTML', () => {
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
            ]
        }

        // Test that the shallow properties of the plp object are correct
        for (const key in parsedContent) {
            if (key !== 'products') {
                expect(parsedContent[key]).toEqual(expected[key])
            }
        }
    })
})
