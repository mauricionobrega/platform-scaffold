import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as appActions from '../app/actions'
import * as miniCartActions from './actions'

const initialState = Immutable.fromJS({
    isOpen: false
})

export default createReducer({
    // [appActions.onPageReceived]: (state, payload) => {
    //     const {$, $response} = payload
    //     const parsed = Immutable.fromJS(cartLinkParser($, $response))
    //     return state.merge(parsed)
    // },

    [miniCartActions.receiveContents]: (state, payload) => {
        return state.set('contentsLoaded', true)
                    .mergeDeep(payload)
    },
    // [miniCartActions.receiveResponse]: (state) => {
    //     return state
    // },
    // [miniCartActions.fetchContents]: (state) => {
    //     return state
    // }

    [miniCartActions.closeMiniCart]: (state) => {
        return state.set('isOpen', false)
    },

    [miniCartActions.openMiniCart]: (state) => {
        return state.set('isOpen', true)
    }
}, initialState)
