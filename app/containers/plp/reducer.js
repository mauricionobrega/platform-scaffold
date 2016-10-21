import Immutable from 'immutable'
import {createReducer} from 'redux-act'
import {getComponentName} from '../../utils/utils'
import {onPageReceived, onRouteChanged} from '../app/actions'

import parser from './parsers/plp'
import PLP from './container'
import {SELECTOR, PLACEHOLDER} from './constants'

const isPageType = (pageType) => pageType === getComponentName(PLP)

const getSelector = (state) => {
    const path = window.location.pathname
    return state.has(path) ? path : PLACEHOLDER
}

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
        const {$, $response, pageType} = action

        if (isPageType(pageType)) {
            const parsedPlp = Immutable.fromJS(parser($, $response))
            const currentLocation = window.location.pathname

            /**
             * Update the store using location.pathname as key and the result from
             * the parser as our value.
             * Also set the store's current selector to location.pathname so we
             * can access it in our container.
             */
            return state
                .set(SELECTOR, currentLocation)
                .set(currentLocation, parsedPlp)
        } else {
            return state
        }
    },
    [onRouteChanged]: (state, action) => isPageType(action.pageType) ? state.set(SELECTOR, getSelector(state)) : state
}, initialState)

export default plp
