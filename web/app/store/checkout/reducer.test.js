/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'
import reducer from './reducer'
import * as checkoutActions from '../../integration-manager/checkout/results'

/* eslint-disable newline-per-chained-call */

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    expect(reducer(Immutable.Map(), action)).toEqual(Immutable.Map())
})


test('receiveCheckoutCustomContent updates the custom branch of the checkout state', () => {
    const customContent = {test: 'checkout content'}
    const expectedState = Immutable.fromJS({custom: customContent})
    const action = checkoutActions.receiveCheckoutCustomContent(customContent)

    expect(reducer(Immutable.Map(), action)).toEqual(expectedState)
})

test('receiveLocationsCustomContent updates the custom branch of locations', () => {
    const customContent = {test: 'locations content'}
    const expectedState = {locations: {custom: customContent}}
    const action = checkoutActions.receiveLocationsCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})

test('receiveShippingCustomContent updates the custom branch of shipping', () => {
    const customContent = {test: 'shipping content'}
    const expectedState = {shipping: {custom: customContent}}
    const action = checkoutActions.receiveShippingCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})

test('receiveShippingAddressCustomContent updates the custom branch of shipping address', () => {
    const customContent = {test: 'shipping address content'}
    const expectedState = {shipping: {address: {custom: customContent}}}
    const action = checkoutActions.receiveShippingAddressCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})

test('receiveBillingCustomContent updates the custom branch of billing', () => {
    const customContent = {test: 'billing content'}
    const expectedState = {billing: {custom: customContent}}
    const action = checkoutActions.receiveBillingCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})

test('receiveBillingAddressCustomContent updates the custom branch of billing address', () => {
    const customContent = {test: 'billing address content'}
    const expectedState = {billing: {address: {custom: customContent}}}
    const action = checkoutActions.receiveBillingAddressCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})

test('receivePaymentCustomContent updates the custom branch of billing', () => {
    const customContent = {test: 'Payment content'}
    const expectedState = {payment: {custom: customContent}}
    const action = checkoutActions.receivePaymentCustomContent(customContent)

    expect(reducer(Immutable.Map(), action).toJS()).toEqual(expectedState)
})
