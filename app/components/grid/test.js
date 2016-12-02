import {mount, shallow} from 'enzyme'
import React from 'react'

import Grid from './index.jsx'

test('Grid renders without errors', () => {
    const wrapper = mount(<Grid />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Grid />)

    expect(wrapper.hasClass('c-grid')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Grid />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Grid className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
