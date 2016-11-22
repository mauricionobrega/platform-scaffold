import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as appActions from './actions'
import {FETCH_IN_PROGRESS, CURRENT_URL} from './constants'
import breadcrumbsParser from './parsers/breadcrumbs'

const initialState = Immutable.Map({
    [FETCH_IN_PROGRESS]: false,
    [CURRENT_URL]: false,
    breadcrumbs: Immutable.Map({
        items: []
    })
})

export default createReducer({
    [appActions.onRouteChanged]: (state, {currentURL}) => {
        return state.set(FETCH_IN_PROGRESS, true)
            .set(CURRENT_URL, currentURL)
            .set('breadcrumbs', Immutable.Map({items: []}))
    },
    [appActions.onPageReceived]: (state, action) => {
        const {$, $response} = action
        return state.set(FETCH_IN_PROGRESS, false)
            .set('breadcrumbs', Immutable.Map(breadcrumbsParser($, $response)))
    }
}, initialState)
