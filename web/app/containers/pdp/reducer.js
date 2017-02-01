import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as RouterUtils from '../../utils/router-utils'

import PDP from './container'
import * as pdpActions from './actions'

import {onRouteChanged} from '../app/actions'
import {PLACEHOLDER} from '../app/constants'
import {mergePayloadForActions} from '../../utils/reducer-utils'

export const initialState = Immutable.fromJS({
    contentsLoaded: false
})

const reducer = handleActions({
    ...mergePayloadForActions(pdpActions.receiveData, pdpActions.receiveNewItemQuantity),
    [onRouteChanged]: (state, {payload}) => {
        const {pageComponent, currentURL} = payload

        if (RouterUtils.isPageType(pageComponent, PDP) && !state.has(currentURL)) {
            return state.set(currentURL, initialState)
        } else {
            return state
        }
    }
}, RouterUtils.baseInitialState.set(PLACEHOLDER, initialState))

export default reducer
