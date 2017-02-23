/* eslint-env jest */
/* eslint-disable import/namespace */

import React from 'react'
import ConnectedPLPHeading from './product-list-header'
import {mount, shallow} from 'enzyme'

import * as AstroIntegration from '../../../utils/astro-integration'

const ProductListHeader = ConnectedPLPHeading.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<ProductListHeader />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-product-list'

test('doesnt render the breadcrumbs if running in Astro', () => {
    AstroIntegration.isRunningInAstro = true

    const wrapper = shallow(<ProductListHeader />)
    const breadcrumbs = wrapper.find(`.${ROOT_CLASS}__breadcrumb`)
    expect(breadcrumbs.length).toBe(0)
})

test('renders the breadcrumbs if not running in Astro', () => {
    AstroIntegration.isRunningInAstro = false

    const wrapper = shallow(<ProductListHeader />)
    const breadcrumbs = wrapper.find(`.${ROOT_CLASS}__breadcrumb`)
    expect(breadcrumbs.length).toBe(1)
})
