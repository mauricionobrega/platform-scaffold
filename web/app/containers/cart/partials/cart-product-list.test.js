import React from 'react'
import CartProductList from './cart-product-list'
import {mount, shallow} from 'enzyme'

test('renders without errors', () => {
    const wrapper = mount(<CartProductList cart={{items: []}} />)

    expect(wrapper.length).toBe(1)
})

test('renders without errors with one item', () => {
    const wrapper = mount(<CartProductList cart={{items: [{product_name: 'TestName', product_image: {alt: 'TestAlt', src: 'TestSrc'}}], summary_count: 1}} />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__product-list'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartProductList cart={{items: []}} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})
