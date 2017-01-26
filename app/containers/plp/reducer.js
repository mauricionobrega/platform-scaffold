import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import {baseInitialState, isPageType, getNextSelector} from '../../utils/router-utils'
import {onRouteChanged} from '../app/actions'
import {SELECTOR, PLACEHOLDER} from '../app/constants'

import PLP from './container'
import * as plpActions from './actions'

export const initialState = Immutable.fromJS({
    contentsLoaded: false,
    hasProducts: true,
    numItems: '',
    noResultsText: '',
    productUrls: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    title: ''
})

const plpReducer = handleActions({
    [plpActions.receiveData]: (state, {payload}) => state.mergeDeep(payload),
    [onRouteChanged]: (state, {payload}) => {
        const {pageComponent, currentURL} = payload

        return isPageType(pageComponent, PLP) ? state.set(SELECTOR, getNextSelector(state, currentURL)) : state
    }
}, baseInitialState.set(PLACEHOLDER, initialState))

export default plpReducer
