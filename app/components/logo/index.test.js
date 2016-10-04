import {mount} from 'enzyme'
import React from 'react'

import Logo from './index'

/* eslint-disable newline-per-chained-call */

test('Logo renders without errors', () => {
    const wrapper = mount(<Logo />)
    expect(wrapper.length).toBe(1)
})
