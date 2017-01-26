import {mount, shallow} from 'enzyme'
import React from 'react'

import OfflineBanner from './index.jsx'

test('OfflineBanner renders without errors', () => {
    const wrapper = mount(<OfflineBanner />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<OfflineBanner />)

    expect(wrapper.hasClass('c-offline-banner')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<OfflineBanner />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<OfflineBanner className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
