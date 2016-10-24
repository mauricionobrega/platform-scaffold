import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import pdpParser from './pdp-parser'
import * as appActions from '../app/actions'

const initialState = Immutable.fromJS({})

export default createReducer({
    [appActions.onPageReceived]: (state, {$, $response, pageType}) => {
        if (pageType !== 'PDP') {
            return state
        }
        return state.mergeDeep({
            contentsLoaded: true,
            ...pdpParser($, $response)
        })
    }
}, initialState)
