/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */

import Immutable from 'immutable'
import modalReducer from './reducer'
import {openModal, closeModal, closeAllModals} from './actions'
import {onRouteChanged} from '../../containers/app/actions'

test('openModal opens a modal', () => {
    const initialState = Immutable.Map({
        'Already Open': true,
        'Already Closed': false
    })

    const action = openModal('Test modal')

    const finalState = modalReducer(initialState, action)

    expect(finalState.get('Already Open')).toBeTruthy()
    expect(finalState.get('Already Closed')).toBeFalsy()
    expect(finalState.get('Test modal')).toBeTruthy()
})

test('closeModal opens a modal', () => {
    const initialState = Immutable.Map({
        'Already Open': true,
        'Already Closed': false,
        'Test modal': true
    })

    const action = closeModal('Test modal')

    const finalState = modalReducer(initialState, action)

    expect(finalState.get('Already Open')).toBeTruthy()
    expect(finalState.get('Already Closed')).toBeFalsy()
    expect(finalState.get('Test modal')).toBeFalsy()
})

test('closeAllModals closes all modals', () => {
    const initialState = Immutable.Map({
        'Already Open': true,
        'Already Closed': false
    })

    const action = closeAllModals()

    const finalState = modalReducer(initialState, action)

    expect(finalState.get('Already Open')).toBeFalsy()
    expect(finalState.get('Already Closed')).toBeFalsy()
})

test('onRouteChanged closes all modals', () => {
    const initialState = Immutable.Map({
        'Already Open': true,
        'Already Closed': false
    })

    const action = onRouteChanged()

    const finalState = modalReducer(initialState, action)

    expect(finalState.get('Already Open')).toBeFalsy()
    expect(finalState.get('Already Closed')).toBeFalsy()
})
