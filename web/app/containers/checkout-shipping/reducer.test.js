/* eslint-env jest */
/* eslint-disable import/namespace */
import {Map} from 'immutable'

import reducer from './reducer'
import {receiveContents, showCompanyAndApt} from './actions'

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    const inputState = Map({
        test: true,
        item: false,
    })

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('checkoutShippingActions.receiveContents sets contentsLoaded flag', () => {
    const action = receiveContents({})

    const initialState = Map({
        contentsLoaded: false,
        bystander: 'data'
    })

    const finalState = Map({
        contentsLoaded: true,
        bystander: 'data'
    })

    expect(reducer(initialState, action).equals(finalState)).toBe(true)
})

test('checkoutShippingActions.showCompanyAndApt sets isCompanyOrAptShown flag', () => {
    const action = showCompanyAndApt({})

    const initialState = Map({
        isCompanyOrAptShown: false,
        bystander: 'data'
    })

    const finalState = Map({
        isCompanyOrAptShown: true,
        bystander: 'data'
    })

    expect(reducer(initialState, action).equals(finalState)).toBe(true)
})
