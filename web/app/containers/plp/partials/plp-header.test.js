/* eslint-env jest */
/* eslint-disable import/namespace */

import React from 'react'
import ConnectedPLPHeading from './plp-header'
import {mount, shallow} from 'enzyme'

import * as AstroIntegration from '../../../utils/astro-integration'

const PLPHeading = ConnectedPLPHeading.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<PLPHeading />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-plp'

test('doesnt render the breadcrumbs if running in Astro', () => {
    AstroIntegration.isRunningInAstro = true

    const wrapper = shallow(<PLPHeading />)
    const breadcrumbs = wrapper.find(`.${ROOT_CLASS}__breadcrumb`)
    expect(breadcrumbs.length).toBe(0)
})

test('renders the breadcrumbs if not running in Astro', () => {
    AstroIntegration.isRunningInAstro = false

    const wrapper = shallow(<PLPHeading />)
    const breadcrumbs = wrapper.find(`.${ROOT_CLASS}__breadcrumb`)
    expect(breadcrumbs.length).toBe(1)
})
