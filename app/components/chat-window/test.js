import {mount, shallow} from 'enzyme'
import React from 'react'

import ChatWindow from './index.jsx'

test('ChatWindow renders without errors', () => {
    const wrapper = mount(<ChatWindow />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<ChatWindow />)

    expect(wrapper.hasClass('c-chat-window')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<ChatWindow />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<ChatWindow className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
