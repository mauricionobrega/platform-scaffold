import React from 'react'
import SignInForm from './signin'
import {shallow} from 'enzyme'

test('renders without errors', () => {
    const wrapper = shallow(<SignInForm />)
    expect(wrapper.length).toBe(1)
})
