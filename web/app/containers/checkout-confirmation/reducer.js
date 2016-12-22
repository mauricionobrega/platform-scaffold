import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: true,
    testText: 'Confirmation'
})

export default createReducer({
    [checkoutConfirmationActions.receiveContents]: (state, payload) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    }
}, initialState)
