/* eslint-env jquery, jest */
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
})
