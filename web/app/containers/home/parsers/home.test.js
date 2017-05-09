/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import homeParser from './home'

describe('the home parser', () => {
    const $content = jquerifyHtmlFile('app/containers/home/parsers/home.test.html')
    const parsedContent = homeParser($, $content)

    it('should extract the home content from the rendered HTML', () => {
        const expected = {
            categories: [
                {
                    href: 'https://www.merlinspotions.com/potions.html',
                    text: 'Potions'
                },
                {
                    href: 'https://www.merlinspotions.com/books.html',
                    text: 'Books'
                },
                {
                    href: 'https://www.merlinspotions.com/ingredients.html',
                    text: 'Ingredients'
                },
                {
                    href: 'https://www.merlinspotions.com/supplies.html',
                    text: 'Supplies'
                },
                {
                    href: 'https://www.merlinspotions.com/charms.html',
                    text: 'Charms'
                },
                {
                    href: 'https://www.merlinspotions.com/new-arrivals.html',
                    text: 'New Arrivals'
                }
            ],
            // TODO: Update this expected object after we update desktop with new content
            banners: [
                {
                    alt: 'Merlins Potions',
                    src: 'https://www.merlinspotions.com/media/logo/default/MerlinsPotions_Logo_Light.png'
                },
                {},
                {
                    alt: '',
                    src: 'https://www.merlinspotions.com/media/wysiwyg/MP_banner_4.jpg'
                }
            ]
        }

        expect(parsedContent.categories).toEqual(expected.categories)
        expect(parsedContent.banners).toEqual(expected.banners)
    })
})
