import test from 'ava'
import {mount} from 'enzyme'
import React from 'react'
import 'ignore-styles'

import Logo from './index'

/* eslint-disable newline-per-chained-call */

test('Logo renders without errors', (t) => {
    const wrapper = mount(<Logo />)
    t.is(wrapper.length, 1)
})
