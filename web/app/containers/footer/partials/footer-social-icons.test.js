/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {mount} from 'enzyme'
import React from 'react'

import FooterSocialIcons from './footer-social-icons'

test('FooterSocialIcons renders without errors', () => {
    const wrapper = mount(<FooterSocialIcons />)
    expect(wrapper.length).toBe(1)
})
