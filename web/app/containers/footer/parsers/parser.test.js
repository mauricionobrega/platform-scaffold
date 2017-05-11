/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import * as parser from './parser'
import {TextLink} from '../../../utils/parser-utils'

describe('the footer parser', () => {

    const $content = jquerifyHtmlFile('app/containers/footer/parsers/footer-example.html')

    test('should extract newsletter signup info from the rendered HTML', () => {
        const expected = {
            action: 'http://www.merlinspotions.com/newsletter/subscriber/new/',
            method: 'post',
        }
        expect(parser.parseNewsLetter($content)).toEqual(expected)
    })

    test('should extract footer navigation from the rendered HTML', () => {
        const expected = [
            TextLink({
                text: 'Privacy and Cookie Policy',
                href: 'http://www.merlinspotions.com/privacy-policy-cookie-restriction-mode/',
                title: undefined
            }),
            TextLink({
                text: 'Search Terms',
                href: 'http://www.merlinspotions.com/search/term/popular/',
                title: undefined
            }),
            TextLink({
                text: 'Contact Us',
                href: 'http://www.merlinspotions.com/contact/',
                title: undefined
            }),
            TextLink({
                text: 'Orders and Returns',
                href: 'http://www.merlinspotions.com/sales/guest/form/',
                title: undefined
            }),
            TextLink({
                text: 'Advanced Search',
                href: 'http://www.merlinspotions.com/catalogsearch/advanced/',
                title: undefined
            })
        ]
        expect(parser.parseNavigation($, $content)).toEqual(expected)
    })
})
