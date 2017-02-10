/* eslint-env jest */
import Immutable from 'immutable'
import React from 'react'
import CheckoutShippingReduxForm from './checkout-shipping-form'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'


test('renders without errors', () => {
    const store = {
        subscribe: () => {},
        dispatch: () => {},
        getState: () => ({
            checkout: Immutable.Map(),
            ui: {checkoutShipping: Immutable.Map()}
        })
    }
    const wrapper = mount(
        <Provider store={store}>
            <CheckoutShippingReduxForm />
        </Provider>)

    expect(wrapper.length).toBe(1)
})
