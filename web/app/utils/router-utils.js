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

export const baseInitialState = Immutable.Map({
    [SELECTOR]: PLACEHOLDER,
    [PLACEHOLDER]: null
})
