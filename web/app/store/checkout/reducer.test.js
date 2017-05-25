/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'
import reducer from './reducer'
import {receiveCheckoutCustomContent} from '../../integration-manager/checkout/results'

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
    const action = receiveCheckoutCustomContent(customContent)

    expect(reducer(Immutable.Map(), action)).toEqual(expectedState)
})
