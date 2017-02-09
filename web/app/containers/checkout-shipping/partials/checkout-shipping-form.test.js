import React from 'react'
import CheckoutShippingReduxForm from './checkout-shipping-form'
import {shallow} from 'enzyme'


test('renders without errors', () => {
    const wrapper = shallow(<CheckoutShippingReduxForm />)

    expect(wrapper.length).toBe(1)
})
