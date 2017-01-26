import {mount, shallow} from 'enzyme'
import React from 'react'

import Clippy from './index.jsx'

test('Clippy renders without errors', () => {
    const wrapper = mount(<Clippy />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Clippy />)

    expect(wrapper.hasClass('c-clippy')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Clippy />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Clippy className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})