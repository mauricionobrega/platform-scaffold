/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import Immutable from 'immutable'
import reducer from './reducer'
import {receiveCartCustomContent} from '../../integration-manager/cart/results'

/* eslint-disable newline-per-chained-call */

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    expect(reducer(Immutable.Map(), action)).toEqual(Immutable.Map())
})


test('receiveCartCustomContent updates the custom branch of the cart state', () => {
    const customContent = {test: 'cart content'}
    const expectedState = Immutable.fromJS({custom: customContent})
    const action = receiveCartCustomContent(customContent)

    expect(reducer(Immutable.Map(), action)).toEqual(expectedState)
})
