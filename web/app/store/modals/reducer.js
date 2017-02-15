import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

import * as modalActions from './actions'
import * as appActions from '../../containers/app/actions'

const initialState = Map()

const modalReducer = handleActions({
    [modalActions.openModal]: (state, {payload: modalName}) =>
        state.setIn([modalName, 'isOpen'], true),
    [modalActions.closeModal]: (state, {payload: modalName}) =>
        state.setIn([modalName, 'isOpen'], false),
    [modalActions.receiveModalContents]: (state, {payload: {modalName, ...contents}}) =>
        state.set(modalName, Map(contents)),
    [modalActions.closeAllModals]: () => initialState,
    [appActions.onRouteChanged]: () => initialState

}, initialState)

export default modalReducer
