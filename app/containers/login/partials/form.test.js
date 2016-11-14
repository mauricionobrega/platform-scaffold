import React from 'react'
import LoginForm from './form'
import {shallow} from 'enzyme'

test('renders without errors', () => {
    const wrapper = shallow(<LoginForm />)
    expect(wrapper.length).toBe(1)
})
