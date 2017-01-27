import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as RouterUtils from '../../utils/router-utils'

import PDP from './container'
import * as pdpActions from './actions'

import {onRouteChanged} from '../app/actions'
import {SELECTOR, PLACEHOLDER} from '../app/constants'

export const initialState = Immutable.fromJS({
    breadcrumbs: [],
    contentsLoaded: false,
    formInfo: {},
    itemQuantity: 1
})

const reducer = handleActions({
    [pdpActions.receiveData]: (state, {payload}) => state.mergeDeep(payload),
    [onRouteChanged]: (state, {payload}) => {
        const {pageComponent, currentURL} = payload

        if (RouterUtils.isPageType(pageComponent, PDP)) {
            return state.withMutations((s) => {
                if (!state.has(currentURL)) {
                    s.set(currentURL, initialState)
                }
                s.set(SELECTOR, currentURL)
            })
        } else {
            return state
        }
    },
    [pdpActions.setItemQuantity]: (state, {payload}) => {
        return RouterUtils.setInToRoutedState(state, 'itemQuantity', payload)
    }
}, RouterUtils.baseInitialState.set(PLACEHOLDER, initialState))

export default reducer
