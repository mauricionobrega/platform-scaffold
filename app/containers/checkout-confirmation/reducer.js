import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: true,
    isLoggedIn: true,
    isModalShown: false,
})

export default createReducer({
    [checkoutConfirmationActions.receiveContents]: (state, payload) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    },
    [checkoutConfirmationActions.showModal]: (state) => {
        return state.mergeDeep({isModalShown: true})
    },
    [checkoutConfirmationActions.hideModal]: (state) => {
        return state.mergeDeep({isModalShown: false})
    },
}, initialState)
