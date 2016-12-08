import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import * as RouterUtils from '../../../utils/router-utils'

import PLP from '../../plp/container'
import PDP from '../../pdp/container'
import {plpParser, pdpParser} from './parser'


import {onPageReceived, onRouteChanged} from '../../app/actions'
import {PLACEHOLDER} from '../../app/constants'

export const initialState = Immutable.fromJS({
    [PLACEHOLDER]: {
        title: '',
        price: '',
        link: {
            href: '',
            text: '',
            title: ''
        },
        image: {
            title: '',
            alt: '',
            src: ''
        },
        description: '',
        carouselItems: []
    }
})

const productReducer = createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageType, url} = action

        if (RouterUtils.isPageType(pageType, PLP)) {
            const parsedProducts = plpParser($, $response)
            return Immutable.fromJS(parsedProducts).mergeDeep(state)
        } else if (RouterUtils.isPageType(pageType, PDP)) {
            const parsedProduct = {[url]: pdpParser($, $response)}
            return Immutable.fromJS(parsedProduct).mergeDeep(state)
        } else {
            return state
        }
    },
    [onRouteChanged]: (state, action) => {
        const {pageType, currentURL} = action

        if (RouterUtils.isPageType(pageType, PDP) && !state.has(currentURL)) {
            return state.set(currentURL, initialState)
        } else {
            return state
        }
    }
}, initialState)

export default productReducer
