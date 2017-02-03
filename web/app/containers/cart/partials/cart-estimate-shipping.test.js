import React from 'react'
import ConnectedCartEstimateShippingModal from './cart-estimate-shipping'
import Field from 'progressive-web-sdk/dist/components/field'
import {mount, shallow} from 'enzyme'

const CartEstimateShippingModal = ConnectedCartEstimateShippingModal.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<CartEstimateShippingModal countries={[]} stateProvinces={[]} />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__estimate-shipping-modal'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartEstimateShippingModal countries={[]} stateProvinces={[]} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the countries and state/provinces', () => {
    const wrapper = shallow(<CartEstimateShippingModal countries={['TestCountry1', 'TestCountry2']} stateProvinces={['TestStateProvince1', 'TestStateProvince2']} />)

    const fields = wrapper.find(Field)

    expect(fields.length).toBe(3)
})
