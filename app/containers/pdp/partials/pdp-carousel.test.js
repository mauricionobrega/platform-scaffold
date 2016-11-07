import React from 'react'
import PDPCarousel from './pdp-carousel'
import {mount, shallow} from 'enzyme'
import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'

/* eslint-disable newline-per-chained-call */

test('renders without errors', () => {
    const wrapper = mount(<PDPCarousel />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 'c-pdp-carousel'

test('renders the component class correctly', () => {
    const wrapper = shallow(<PDPCarousel />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders a Carousel', () => {
    const wrapper = shallow(<PDPCarousel />)

    expect(wrapper.children().first().type()).toBe(Carousel)
})

test('renders a CarouselItem for each item passed', () => {
    const items = [
        {position: '0', img: 'test.png'},
        {position: '1', img: 'whoa.gif'}
    ];

    [0, 1, 2].forEach((n) => {
        const wrapper = shallow(<PDPCarousel items={items.slice(0, n)} />)

        const carouselItems = wrapper.find(CarouselItem)
        expect(carouselItems.length).toBe(n)
        for (let i = 0; i < n; i++) {
            const itemContents = carouselItems.at(i).children()
            expect(itemContents.length).toBe(1)
            expect(itemContents.type()).toBe('img')
            expect(itemContents.prop('src')).toBe(items[i].img)
        }
    })
})
