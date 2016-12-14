import {createReducer} from 'redux-act'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    items: []
})

export default createReducer({

}, initialState)
