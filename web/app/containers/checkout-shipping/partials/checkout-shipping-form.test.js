import React from 'react'
import CheckoutShippingReduxForm from './checkout-shipping-form'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'

test('renders without errors', () => {
    const store = {
        subscribe: () => {},
        dispatch: () => {},
        getState: () => ({})
    }

    const wrapper = mount(
        <Provider store={store}>
            <CheckoutShippingReduxForm />
        </Provider>)

    expect(wrapper.length).toBe(1)
})
