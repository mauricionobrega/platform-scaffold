import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as checkoutShippingActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: false,
    testText: ''
})

export default createReducer({
    [checkoutShippingActions.receiveContents]: (state, payload) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    }
}, initialState)
