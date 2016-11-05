import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as miniCartActions from './actions'

const initialState = Immutable.fromJS({
    isOpen: false
})

export default createReducer({
    [miniCartActions.receiveContents]: (state, payload) => {
        return state.set('contentsLoaded', true)
                    .mergeDeep(payload)
    },

    [miniCartActions.closeMiniCart]: (state) => {
        return state.set('isOpen', false)
    },

    [miniCartActions.openMiniCart]: (state) => {
        return state.set('isOpen', true)
    }

}, initialState)
