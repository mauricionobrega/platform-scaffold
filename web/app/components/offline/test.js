import {mount, shallow} from 'enzyme'
import React from 'react'

import Offline from './index.jsx'

test('Offline renders without errors', () => {
    const wrapper = mount(<Offline />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Offline />)

    expect(wrapper.hasClass('c-offline')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Offline />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Offline className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
