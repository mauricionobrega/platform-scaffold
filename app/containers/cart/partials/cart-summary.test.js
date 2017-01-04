import React from 'react'
import CartSummary from './cart-summary'
import {Provider} from 'react-redux'
import {mount, shallow, mockStore} from 'enzyme'

test('renders without errors', () => {
    const store = {
        subscribe: () => {},
        dispatch: () => {},
        getState: () => ({})
    }

    const wrapper = mount(
        <Provider store={store}>
            <CartSummary cart={{summary_count: '0', subtotal_excl_tax: '0', subtotal_incl_tax: '0'}} />
        </Provider>)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__summary'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartSummary cart={{summary_count: '0', subtotal_excl_tax: '0', subtotal_incl_tax: '0'}} store={mockStore} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})
