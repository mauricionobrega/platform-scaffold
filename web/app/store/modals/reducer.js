/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

import * as modalActions from './actions'
import * as appActions from '../../containers/app/actions'

const initialState = Map()

const modalReducer = handleActions({
    [modalActions.openModal]: (state, {payload: modalName}) =>
        state.set(modalName, true),
    [modalActions.closeModal]: (state, {payload: modalName}) =>
        state.set(modalName, false),
    [modalActions.closeAllModals]: () => initialState,
    [appActions.onRouteChanged]: () => initialState

}, initialState)

export default modalReducer
