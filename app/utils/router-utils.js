import Immutable from 'immutable'
import {getComponentType} from './utils'
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
export const isPageType = (pageType, component) => pageType === getComponentType(component)

/**
 * Determine whether we should display content or transition into a placeholder state
 */
export const getNextSelector = (state, currentURL) => { return state.has(currentURL) ? currentURL : PLACEHOLDER }


/**
 * Takes a slice of state and returns the key of the current route
 */
export const getSelectorFromState = (state) => state.get(SELECTOR)

/**
 * Takes a slice of state and returns the data mapped to the current route
 *
 * eg. plp > 'http://www.merlinspotions.com/potions.html' > {data}
 */
export const getRoutedState = (state) => state.get(getSelectorFromState(state))

export const baseInitialState = Immutable.Map({
    [SELECTOR]: PLACEHOLDER,
    [PLACEHOLDER]: null
})

/**
 * Perform a setIn to the currently selected key
 */
export const setInToRoutedState = (state, key, payload) => {
    const selector = getSelectorFromState(state)
    return state.setIn([selector, key], payload)
}
