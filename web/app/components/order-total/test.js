/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {mount, shallow} from 'enzyme'
/* eslint-env jest */
import React from 'react'
import Immutable from 'immutable'
import {Provider} from 'react-redux'

import OrderTotal from './index.jsx'

const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
        cart: Immutable.Map()
    })
}

test('OrderTotal renders without errors', () => {
    const wrapper = mount(
        <Provider store={store}>
            <OrderTotal />
        </Provider>
        )
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = mount(
        <Provider store={store}>
            <OrderTotal />
        </Provider>
        )

    expect(wrapper.hasClass('c-order-total')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <OrderTotal />
        </Provider>
        )
    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(
            <Provider store={store}>
                <OrderTotal className={name} />
            </Provider>
            )
        expect(wrapper.hasClass(name)).toBe(true)
    })
})
