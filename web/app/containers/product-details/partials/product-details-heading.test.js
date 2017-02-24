/* eslint-env jest */
import React from 'react'
import ConnectedProductDetailsHeading from './product-details-heading'
import {mount, shallow} from 'enzyme'

const ProductDetailsHeading = ConnectedProductDetailsHeading.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<ProductDetailsHeading />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-product-details-heading'

test('renders the component class correctly', () => {
    const wrapper = shallow(<ProductDetailsHeading />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the title and price', () => {
    const wrapper = shallow(<ProductDetailsHeading title="Potion of Healing" price="10gp" />)

    const titleElement = wrapper.find(`.${ROOT_CLASS}__title`)
    expect(titleElement.length).toBe(1)
    expect(titleElement.text()).toBe('Potion of Healing')

    const priceElement = wrapper.find(`.${ROOT_CLASS}__price`)
    expect(priceElement.length).toBe(1)
    expect(priceElement.text()).toBe('10gp')
})
