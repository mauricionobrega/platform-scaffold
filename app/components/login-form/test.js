import test from 'ava'
import {mount} from 'enzyme'
import React from 'react'
import 'ignore-styles'

import LoginForm from './index.jsx'

test('LoginForm renders without errors', (t) => {
    const wrapper = mount(<LoginForm />)
    t.is(wrapper.length, 1)
})
