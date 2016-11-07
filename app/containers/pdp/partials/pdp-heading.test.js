import React from 'react'
import PDPHeading from './pdp-heading'
import {mount, shallow} from 'enzyme'

test('renders without errors', () => {
    const wrapper = mount(<PDPHeading />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 'c-pdp-heading'

test('renders the component class correctly', () => {
    const wrapper = shallow(<PDPHeading />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the title and price', () => {
    const wrapper = shallow(<PDPHeading title="Potion of Healing" price="10gp" />)

    const titleElement = wrapper.find(`.${ROOT_CLASS}__title`)
    expect(titleElement.length).toBe(1)
    expect(titleElement.text()).toBe('Potion of Healing')

    const priceElement = wrapper.find(`.${ROOT_CLASS}__price`)
    expect(priceElement.length).toBe(1)
    expect(priceElement.text()).toBe('10gp')
})
