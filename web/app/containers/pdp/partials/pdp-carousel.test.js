import React from 'react'
import ConnectedPDPCarousel from './pdp-carousel'
import {mount, shallow} from 'enzyme'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const PDPCarousel = ConnectedPDPCarousel.WrappedComponent

/* eslint-disable newline-per-chained-call */

test('renders without errors', () => {
    const wrapper = mount(<PDPCarousel />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-pdp__carousel'

test('renders the component class correctly', () => {
    const carouselItems = [
        {position: '0', img: 'test.png'}
    ]
    const wrapper = shallow(<PDPCarousel items={carouselItems} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders a Carousel', () => {
    const carouselItems = [
        {position: '0', img: 'test.png'}
    ]
    const wrapper = shallow(<PDPCarousel items={carouselItems} />)

    expect(wrapper.type()).toBe(Carousel)
})

test('renders a CarouselItem for each item passed', () => {
    const items = [
        {position: '0', img: 'test.png'},
        {position: '1', img: 'whoa.gif'}
    ];

    [1, 2].forEach((n) => {
        const wrapper = shallow(<PDPCarousel items={items.slice(0, n)} />)
        const carouselItems = wrapper.find(CarouselItem)

        expect(carouselItems.length).toBe(n)

        for (let i = 0; i < n; i++) {
            const itemContents = carouselItems.at(i).children()
            expect(itemContents.length).toBe(1)
            expect(itemContents.type()).toBe(Image)
            expect(itemContents.prop('src')).toBe(items[i].img)
        }
    })
})

test('renders two SkeletonBlock when the carousel items array is empty', () => {
    // One skeleton block is a placeholder for the carousel image, the other is
    // for the carousel pips

    const wrapper = shallow(<PDPCarousel items={[]} />)
    const skeletonBlocks = wrapper.find(SkeletonBlock)
    const placeholderCount = 2 // image placeholder, and pip placeholder

    expect(skeletonBlocks.length).toBe(placeholderCount)
})
