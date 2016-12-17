import {mount} from 'enzyme'
import React from 'react'

import Notification from './notification.jsx'

test('Notification renders without errors', () => {
    const wrapper = mount(<Notification content="Test" />)
    expect(wrapper.length).toBe(1)
})
