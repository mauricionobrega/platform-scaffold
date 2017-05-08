/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest */
import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import * as parser from './parser'

describe('the navigation parser', () => {

    const expectedRoot = {title: 'Root', path: '/', children: [
        {title: 'Sign In', path: 'http://www.merlinspotions.com/customer/account/login/', type: 'AccountNavItem'},
        {title: 'Potions', path: 'http://www.merlinspotions.com/potions.html'},
        {title: 'Books', path: 'http://www.merlinspotions.com/books.html'},
        {title: 'Ingredients', path: 'http://www.merlinspotions.com/ingredients.html'},
        {title: 'Supplies', path: 'http://www.merlinspotions.com/supplies.html'},
        {title: 'Charms', path: 'http://www.merlinspotions.com/charms.html'},
        {title: 'New Arrivals', path: 'http://www.merlinspotions.com/new-arrivals.html'}
    ]}

    test('should extract navigation from the rendered HTML when no category is selected', () => {
        const $content = jquerifyHtmlFile('app/containers/navigation/parsers/example.html')
        const expected = {root: expectedRoot, path: '/'}
        expect(parser.parseNavigation($, $content)).toEqual(expected)
    })

    test('should extract navigation from the rendered HTML when a category is selected', () => {
        const $content = jquerifyHtmlFile('app/containers/navigation/parsers/example2.html')
        const expected = {root: expectedRoot, path: 'http://www.merlinspotions.com/charms.html'}
        expect(parser.parseNavigation($, $content)).toEqual(expected)
    })
})
