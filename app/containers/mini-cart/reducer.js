import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as miniCartActions from './actions'

const initialState = Immutable.fromJS({
    isOpen: false
})

export default createReducer({
    // [miniCartActions.receiveContents]: (state, payload) => {
    //     payload.contentsLoaded = true
    //     return state.mergeDeep(payload)
    // },
    // [miniCartActions.receiveResponse]: (state) => {
    //     return state
    // },
    // [miniCartActions.fetchContents]: (state) => {
    //     return state
    // }

    [miniCartActions.closeMiniCart]: (state) => {
        console.log('close?')
        return state.set('isOpen', false)
    },

    [miniCartActions.openMiniCart]: (state) => {
        return state.set('isOpen', true)
    }
}, initialState)
