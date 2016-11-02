import {createReducer} from 'redux-act'
import {Map} from 'immutable'
import * as appActions from './actions'
import {FETCH_IN_PROGRESS, CURRENT_URL} from './constants'

const initialState = Map({
    [FETCH_IN_PROGRESS]: false,
    [CURRENT_URL]: false
})

export default createReducer({
    [appActions.onRouteChanged]: (state, {currentURL}) => {
        return state.set(FETCH_IN_PROGRESS, true).set(CURRENT_URL, currentURL)
    },
    [appActions.onPageReceived]: (state) => {
        return state.set(FETCH_IN_PROGRESS, false)
    }
}, initialState)
