import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as RouterUtils from '../../utils/router-utils'

import PDP from './container'
import * as pdpActions from './actions'

import {onRouteChanged} from '../app/actions'
import {PLACEHOLDER} from '../app/constants'
import {mergePayloadForActions} from '../../utils/reducer-utils'

export const initialState = Immutable.fromJS({
    contentsLoaded: false,
    formInfo: {},
    itemQuantity: 1
})

const reducer = handleActions({
    ...mergePayloadForActions(pdpActions.receiveData, pdpActions.receiveNewItemQuantity),
    [onRouteChanged]: (state, {payload}) => {
        const {pageComponent, currentURL} = payload

        if (RouterUtils.isPageType(pageComponent, PDP)) {
            return state.withMutations((s) => {
                if (!state.has(currentURL)) {
                    s.set(currentURL, initialState)
                }
            })
        } else {
            return state
        }
    }
}, RouterUtils.baseInitialState.set(PLACEHOLDER, initialState))

export default reducer
