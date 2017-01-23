import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

import * as modalActions from './actions'

const initialState = Map()

const modalReducer = handleActions({
    [modalActions.openModal]: (state, {payload: modalName}) =>
        state.set(modalName, true),
    [modalActions.closeModal]: (state, {payload: modalName}) =>
        state.set(modalName, false),
    [modalActions.closeAllModals]: (state) => initialState
}, initialState)

export default modalReducer
