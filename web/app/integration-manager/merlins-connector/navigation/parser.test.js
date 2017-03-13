/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import * as parser from './parser'

const PARSER_PATH = 'app/integration-manager/merlins-connector/navigation'

describe('the navigation parser', () => {

    const expectedRoot = {title: 'Root', path: '/', children: [
        {title: 'Sign In', path: 'http://www.merlinspotions.com/customer/account/login/', type: 'AccountNavItem'},
        {title: 'Potions', path: 'http://www.merlinspotions.com/potions.html', isCategoryLink: true},
        {title: 'Books', path: 'http://www.merlinspotions.com/books.html', isCategoryLink: true},
        {title: 'Ingredients', path: 'http://www.merlinspotions.com/ingredients.html', isCategoryLink: true},
        {title: 'Supplies', path: 'http://www.merlinspotions.com/supplies.html', isCategoryLink: true},
        {title: 'Charms', path: 'http://www.merlinspotions.com/charms.html', isCategoryLink: true},
        {title: 'New Arrivals', path: 'http://www.merlinspotions.com/new-arrivals.html', isCategoryLink: true}
    ]}

    test('should extract navigation from the rendered HTML when no category is selected', () => {
        const $content = jquerifyHtmlFile(`${PARSER_PATH}/example.html`)
        const expected = {root: expectedRoot, path: '/'}
        expect(parser.parseNavigation($, $content)).toEqual(expected)
    })

    test('should extract navigation from the rendered HTML when a category is selected', () => {
        const $content = jquerifyHtmlFile(`${PARSER_PATH}//example2.html`)
        const expected = {root: expectedRoot, path: 'http://www.merlinspotions.com/charms.html'}
        expect(parser.parseNavigation($, $content)).toEqual(expected)
    })
})
