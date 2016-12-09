import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import * as RouterUtils from '../../utils/router-utils'

import PDP from './container'
import pdpParser from './parsers/pdp'
import * as pdpActions from './actions'

import PLP from '../plp/container'
import {basicPlpParser} from './parsers/basic-plp'

import {onPageReceived, onRouteChanged} from '../app/actions'
import {SELECTOR, PLACEHOLDER} from '../app/constants'

export const initialState = Immutable.fromJS({
    isPlaceholder: true,
    contentsLoaded: false,
    itemQuantity: 1,
    itemAddedModalOpen: false,
    quantityAdded: 0,
    product: {
        title: '',
        price: '',
        description: '',
        carouselItems: []
    }
})

const reducer = createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageComponent, url, currentURL} = action

        if (RouterUtils.isPageType(pageComponent, PDP)) {
            const parsed = Immutable.fromJS(pdpParser($, $response))

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
        } else if (RouterUtils.isPageType(pageComponent, PLP)) {
            const parsedPlp = basicPlpParser($, $response)
            return Immutable.fromJS(parsedPlp).mergeDeep(state)
        } else {
            return state
        }
    },
    [onRouteChanged]: (state, action) => {
        const {pageComponent, currentURL} = action

        if (RouterUtils.isPageType(pageComponent, PDP)) {
            return state.set(SELECTOR, RouterUtils.getNextSelector(state, currentURL))
        } else {
            return state
        }
    },
    [pdpActions.setItemQuantity]: (state, payload) => {
        return RouterUtils.setInToRoutedState(state, 'itemQuantity', payload)
    },
    [pdpActions.openItemAddedModal]: (state) => {
        const selector = RouterUtils.getSelectorFromState(state)
        const routedState = RouterUtils.getRoutedState(state)
        return state.set(selector, routedState.mergeDeep({
            itemAddedModalOpen: true,
            quantityAdded: routedState.get('itemQuantity')
        }))
    },
    [pdpActions.closeItemAddedModal]: (state) => {
        return RouterUtils.setInToRoutedState(state, 'itemAddedModalOpen', false)
    }
}, RouterUtils.baseInitialState.set(PLACEHOLDER, initialState))

export default reducer
