import {mount, shallow} from 'enzyme'
import React from 'react'

import StarRating from './index.jsx'

test('StarRating renders without errors', () => {
    const wrapper = mount(<StarRating />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<StarRating />)

    expect(wrapper.hasClass('c-star-rating')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<StarRating />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<StarRating className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
