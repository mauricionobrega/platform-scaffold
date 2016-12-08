import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as checkoutPaymentActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: false,
    testText: ''
})

export default createReducer({
    [checkoutPaymentActions.receiveContents]: (state, payload) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    }
}, initialState)
