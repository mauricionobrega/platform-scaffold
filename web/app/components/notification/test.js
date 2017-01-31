import {mount} from 'enzyme'
import React from 'react'

import Notification from './index.jsx'

test('Notification renders without errors', () => {
    const wrapper = mount(<Notification content="Test" />)
    expect(wrapper.length).toBe(1)
})
