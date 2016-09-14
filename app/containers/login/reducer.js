import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as loginActions from './actions'

const initialState = Map({})

export default createReducer({
    [loginActions.myAction]: (state) => {
        return state
    }
}, initialState)
