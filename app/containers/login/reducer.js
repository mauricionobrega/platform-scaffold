import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as loginActions from './actions'

const initialState = Map({})

export default createReducer({
    [loginActions.receiveLoginContents]: (state, payload) => {
        return state.mergeDeep(payload)
    }
}, initialState)
