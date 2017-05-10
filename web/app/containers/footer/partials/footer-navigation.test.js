/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {mount, shallow} from 'enzyme'
import React from 'react'

import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import ConnectedFooterNavigation from './footer-navigation'

const FooterNavigation = ConnectedFooterNavigation.WrappedComponent

test('FooterNavigation renders without errors', () => {
    const wrapper = mount(<FooterNavigation navigation={[]} />)
    expect(wrapper.length).toBe(1)
})

test('FooterNavigation renders a ListTile for each navigation item', () => {
    const navigation = [
        {href: '/one.html', text: 'One!'},
        {href: '/two.html', text: 'Two!'}
    ]
    const wrapper = shallow(<FooterNavigation navigation={navigation} />)

    const tiles = wrapper.find(ListTile)
    expect(tiles.length).toBe(navigation.length)
    tiles.forEach((tile, idx) => {
        expect(tile.prop('href')).toBe(navigation[idx].href)
        expect(tile.childAt(0).text()).toBe(navigation[idx].text)
    })
})

test('FooterNavigation renders SkeletonText for each navigation item with no text', () => {
    const navigation = [
        {href: '/one.html'},
        {href: '/two.html'}
    ]
    const wrapper = shallow(<FooterNavigation navigation={navigation} />)

    const tiles = wrapper.find(ListTile)
    expect(tiles.length).toBe(navigation.length)
    tiles.forEach((tile, idx) => {
        expect(tile.prop('href')).toBe(navigation[idx].href)
        expect(tile.childAt(0).type()).toBe(SkeletonText)
    })
})
