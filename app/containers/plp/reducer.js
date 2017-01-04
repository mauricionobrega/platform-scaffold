import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import {baseInitialState, isPageType, getNextSelector} from '../../utils/router-utils'
import {onPageReceived, onRouteChanged} from '../app/actions'
import {SELECTOR, PLACEHOLDER} from '../app/constants'

import plpParser from './parsers/plp'
import PLP from './container'

export const initialState = Immutable.fromJS({
    contentsLoaded: false,
    hasProducts: true,
    numItems: '',
    noResultsText: '',
    productUrls: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    title: ''
})

const plpReducer = createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageComponent, url, currentURL} = action

        if (isPageType(pageComponent, PLP)) {
            const parsed = Immutable.fromJS(plpParser($, $response))

            // `.withMutations` allows us to batch together changes to state
            return state.withMutations((s) => {
                // Update the store using location.href as key and the result from
                // the parser as our value -- even if it isn't the page we're
                // currently viewing
                s.set(url, parsed)

                // Also set the store's current selector to location.href so we
                // can access it in our container, but only if we're on that href
                if (url === currentURL) {
                    s.set(SELECTOR, url)
                }
            })
        } else {
            return state
        }
    },
    [onRouteChanged]: (state, action) => {
        const {pageComponent, currentURL} = action

        return isPageType(pageComponent, PLP) ? state.set(SELECTOR, getNextSelector(state, currentURL)) : state
    }
}, baseInitialState.set(PLACEHOLDER, initialState))

export default plpReducer
