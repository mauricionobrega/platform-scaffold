import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import pdpParser from './pdp-parser'
import * as appActions from '../app/actions'
import * as pdpActions from './actions'

const initialState = Immutable.fromJS({
    itemQuantity: 1
})

export default createReducer({
    [appActions.onPageReceived]: (state, {$, $response, pageType}) => {
        if (pageType !== 'PDP') {
            return state
        }
        return state.mergeDeep({
            contentsLoaded: true,
            ...pdpParser($, $response)
        })
    },
    [pdpActions.setItemQuantity]: (state, payload) => {
        return state.set('itemQuantity', payload)
    }
}, initialState)
