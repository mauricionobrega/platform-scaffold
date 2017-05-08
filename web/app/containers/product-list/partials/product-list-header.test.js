/* eslint-env jest */
/* eslint-disable import/namespace */

import React from 'react'
import ConnectedPLPHeading from './product-list-header'
import {mount} from 'enzyme'

const ProductListHeader = ConnectedPLPHeading.WrappedComponent

test('renders without errors', () => {
    const wrapper = mount(<ProductListHeader />)

    expect(wrapper.length).toBe(1)
})
