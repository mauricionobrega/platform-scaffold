import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import * as parser from './parser'

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
            {
                title: 'Privacy and Cookie Policy',
                href: 'http://www.merlinspotions.com/privacy-policy-cookie-restriction-mode/'
            },
            {
                title: 'Search Terms',
                href: 'http://www.merlinspotions.com/search/term/popular/'
            },
            {
                title: 'Contact Us',
                href: 'http://www.merlinspotions.com/contact/'
            },
            {
                title: 'Orders and Returns',
                href: 'http://www.merlinspotions.com/sales/guest/form/'
            },
            {
                title: 'Advanced Search',
                href: 'http://www.merlinspotions.com/catalogsearch/advanced/'
            }
        ]
        expect(parser.parseNavigation($content)).toEqual(expected)
    })
})
