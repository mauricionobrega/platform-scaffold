/* eslint-env jest */
import {mount, shallow} from 'enzyme'
import React from 'react'

import LazyLoadImage from './index.jsx'

test('LazyLoadImage renders without errors', () => {
    const wrapper = mount(<LazyLoadImage />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<LazyLoadImage />)

    expect(wrapper.hasClass('c-lazy-load-image')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<LazyLoadImage />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<LazyLoadImage className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
