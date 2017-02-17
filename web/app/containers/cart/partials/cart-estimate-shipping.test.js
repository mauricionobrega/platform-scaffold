/* eslint-env jest */
import Immutable from 'immutable'
import React from 'react'
import EstimateShippingReduxForm from './cart-estimate-shipping'
import Field from 'progressive-web-sdk/dist/components/field'
import {Provider} from 'react-redux'
import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {mount} from 'enzyme'


const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
        modals: Immutable.Map(),
        checkout: Immutable.fromJS({
            locations: {
                countries: [{value: 'C1', label: 'country 1'}, {value: 'C2', label: 'country 2'}],
                regions: [{value: 'R1', label: 'region 1'}, {value: 'R2', label: 'region 2'}]
            }
        })
    })
}

test('renders without errors', () => {
    const wrapper = mount(
        <Provider store={store}>
            <EstimateShippingReduxForm onSubmit={noop} />
        </Provider>)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__estimate-shipping-modal'

test('renders the component class correctly', () => {
    const wrapper = mount(
        <Provider store={store}>
            <EstimateShippingReduxForm onSubmit={noop} />
        </Provider>)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the countries and state/provinces', () => {
    const wrapper = mount(
        <Provider store={store}>
            <EstimateShippingReduxForm onSubmit={noop} />
        </Provider>)

    const fields = wrapper.find(Field)

    expect(fields.length).toBe(3)
})
