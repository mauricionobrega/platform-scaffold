import Immutable from 'immutable'
import {createReducer} from 'redux-act'
import {getComponentName} from './utils'
import {onPageReceived, onRouteChanged} from '../containers/app/actions'
import {SELECTOR, PLACEHOLDER} from '../containers/app/constants'

/**
 * A pattern where slices of state "cache" data keyed to URLs.
 * A `selector` value holds the currently routed URL.
 *
 * For example,
 *   state: {
 *     plp: {
 *       "selector": "http://www.merlinspotions.com/potions.html",
 *       "placeholder": {
 *         // Skeleton when switching between pages
 *       },
 *       "http://www.merlinspotions.com/potions.html": {
 *         // PLP - Potions
 *       },
 *       "http://www.merlinspotions.com/books.html": {
 *         // PLP - Books
 *       }
 *     }
 *   }
 */


/**
 * Determine whether the page received corresponds to the component we care about
 */
const isPageType = (pageType, component) => pageType === getComponentName(component)

/**
 * Determine whether we should display content or transition into a placeholder state
 */
const getNextSelector = (state, currentURL) => { return state.has(currentURL) ? currentURL : PLACEHOLDER }


/**
 * Takes a slice of state and returns the key of the current route
 */
export const getSelectorFromState = (state) => {
    return state.get(SELECTOR)
}

/**
 * Takes a slice of state and returns the data mapped to the current route
 *
 * eg. plp > 'http://www.merlinspotions.com/potions.html' > {data}
 */
export const getRoutedState = (state) => {
    return state.get(getSelectorFromState(state))
}

export const baseInitialState = Immutable.Map({
    [SELECTOR]: PLACEHOLDER,
    [PLACEHOLDER]: null
})
/**
 * Creates a reducer that manages whether or not we're on a url that
 * is matched to our component, as well as pulling the correct data out
 * based on the 'selector' key
 */
export const createRoutedReducer = (component, parser, initialState, additionalReducers) => {
    return createReducer({
        [onPageReceived]: (state, action) => {
            const {$, $response, pageType, url, currentURL} = action

            if (isPageType(pageType, component)) {
                const parsed = Immutable.fromJS(parser($, $response))

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
            const {pageType, currentURL} = action

            return isPageType(pageType, component) ? state.set(SELECTOR, getNextSelector(state, currentURL)) : state
        },
        ...additionalReducers
    }, baseInitialState.set(PLACEHOLDER, initialState))
}

/**
 * Not currently used...
 */
export const mapRoutedStateToProps = (state) => {
    const routedState = getRoutedState(state)
    return {
        routedState,
        ...routedState.toJS()
    }
}

/**
 * Not currently used...
 */
export const setIntoRoutedState = (state, setFunction) => {
    const routedState = getRoutedState(state)
    const selector = getSelectorFromState(state)
    return state.set(selector, setFunction(routedState))
}
