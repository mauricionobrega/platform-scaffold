import React from 'react'
import RegistrationForm from './form'
import {shallow} from 'enzyme'

test('renders without errors', () => {
    const wrapper = shallow(<RegistrationForm />)
    expect(wrapper.length).toBe(1)
})
