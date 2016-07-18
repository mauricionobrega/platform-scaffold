import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as <%= page.name %>Actions from './actions'

const initialState = Map({})

export default createReducer({


}, initialState)
