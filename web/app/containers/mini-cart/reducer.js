import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as miniCartActions from './actions'
import * as cartActions from '../cart/actions'

const initialState = Immutable.fromJS({
    isOpen: false,
    contentsLoaded: false,
    cart: {
        items: []
    }
})

export default createReducer({
    [cartActions.receiveCartContents]: (state, payload) => {
        return state.mergeDeep(
            {contentsLoaded: true},
            payload)
    },

    [miniCartActions.closeMiniCart]: (state) => {
        return state.set('isOpen', false)
    },

    [miniCartActions.openMiniCart]: (state) => {
        return state.set('isOpen', true)
    }

}, initialState)
