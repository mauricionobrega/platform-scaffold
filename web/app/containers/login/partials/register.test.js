import React from 'react'
import RegisterForm from './register'
import {shallow} from 'enzyme'

test('renders without errors', () => {
    const wrapper = shallow(<RegisterForm />)
    expect(wrapper.length).toBe(1)
})
