/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {shallow} from 'enzyme'
import React from 'react'

import ConnectedFooterNewsletterSubscription from './footer-newsletter-subscription'

const FooterNewsletterSubscription = ConnectedFooterNewsletterSubscription.WrappedComponent

test('FooterNewsletterSubscription renders without errors', () => {
    const wrapper = shallow(<FooterNewsletterSubscription />)
    expect(wrapper.length).toBe(1)
})

test('onSubmitNewsletter adds the action and method when calling onSubmit', () => {
    const onSubmit = jest.fn()
    const newsletter = {
        action: '/submit/subscription',
        method: 'POST'
    }
    const wrapper = shallow(<FooterNewsletterSubscription onSubmit={onSubmit} newsletter={newsletter} />)

    expect(onSubmit).not.toBeCalled()
    const data = {data: 'datadatadata'}
    wrapper.instance().onSubmitNewsletter(data)
    expect(onSubmit).toHaveBeenCalledWith('/submit/subscription', 'POST', data)
})
