import Immutable from 'immutable'
import {createReducer} from 'redux-act'
import {getComponentName} from '../../utils/utils'
import {onPageReceived, onRouteChanged} from '../app/actions'

import parser from './parsers/plp'
import PLP from './container'
import {SELECTOR, PLACEHOLDER} from './constants'

/**
 * To determine if we should modify redux state, we compare the component name of
 * the selected route (and thus, the page we received) to our component: `PLP`
 */
const isPageType = (pageType) => pageType === getComponentName(PLP)

const getSelector = (state, currentURL) => { return state.has(currentURL) ? currentURL : PLACEHOLDER }

export const initialState = Immutable.Map({
    [SELECTOR]: PLACEHOLDER,
    [PLACEHOLDER]: Immutable.Map({
        isPlaceholder: true,
        hasProducts: true,
        numItems: '',
        noResultsText: '',
        products: [{}, {}, {}, {}],
        title: ''
    })
})

const plp = createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageType, url, currentURL} = action

        if (isPageType(pageType)) {
            const parsedPlp = Immutable.fromJS(parser($, $response))

            // `.withMutations` allows us to batch together changes to state
            return state.withMutations((s) => {
                // Update the store using location.href as key and the result from
                // the parser as our value -- even if it isn't the page we're
                // currently viewing
                s.set(url, parsedPlp)

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
        const {pageType, currentURL} = action

        return isPageType(pageType) ? state.set(SELECTOR, getSelector(state, currentURL)) : state
    }
}, initialState)

export default plp
