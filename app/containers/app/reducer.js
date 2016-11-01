import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as appActions from './actions'

export const FETCH_IN_PROGRESS = 'fetchInProgress'

const initialState = Map({
    [FETCH_IN_PROGRESS]: false
})

export default createReducer({
    [appActions.onRouteChanged]: (state) => state.set(FETCH_IN_PROGRESS, true),
    [appActions.onPageReceived]: (state) => state.set(FETCH_IN_PROGRESS, false)
}, initialState)
