/* eslint-env jest */
/* eslint-disable import/namespace */

import React from 'react'
import ConnectedPDPHeading from './pdp-heading'
import {mount, shallow} from 'enzyme'

import * as AstroIntegration from '../../../utils/astro-integration'

const PDPHeading = ConnectedPDPHeading.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<PDPHeading />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-pdp-heading'

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

test('doesnt render the breadcrumbs if running in Astro', () => {
    AstroIntegration.isRunningInAstro = true

    const wrapper = shallow(<PDPHeading />)
    const breadcrumbs = wrapper.find(`.t-pdp__breadcrumbs`)
    expect(breadcrumbs.length).toBe(0)
})

test('renders the breadcrumbs if not running in Astro', () => {
    AstroIntegration.isRunningInAstro = false

    const wrapper = shallow(<PDPHeading />)
    const breadcrumbs = wrapper.find(`.t-pdp__breadcrumbs`)
    expect(breadcrumbs.length).toBe(1)
})
