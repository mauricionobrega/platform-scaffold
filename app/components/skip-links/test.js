import {mount, shallow} from 'enzyme'
import React from 'react'
import 'ignore-styles'

import SkipLinks from './index.jsx'

test('SkipLinks renders without errors', () => {
    const wrapper = mount(<SkipLinks />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<SkipLinks />)

    expect(wrapper.first().prop('className').startsWith('c-skip-links')).toBe(true)
})
