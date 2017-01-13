import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import {isPageType} from '../../../utils/router-utils'

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

const productsReducer = handleActions({
    [onPageReceived]: (state, {payload}) => {
        const {$, $response, pageComponent, url} = payload

        if (isPageType(pageComponent, PLP)) {
            const parsedProducts = plpParser($, $response)
            const merger = (prev, next) => {
                if (prev) {
                    return prev
                } else {
                    return next
                }
            }
            return state.mergeDeepWith(merger, Immutable.fromJS(parsedProducts))
        } else if (isPageType(pageComponent, PDP)) {
            const parsedProduct = {
                [url]: pdpParser($, $response)
            }
            return state.mergeDeep(Immutable.fromJS(parsedProduct))
        } else {
            return state
        }
    },
    [onRouteChanged]: (state, {payload}) => {
        const {pageComponent, currentURL} = payload

        if (isPageType(pageComponent, PDP) && !state.has(currentURL)) {
            return state.set(currentURL, initialState.get(PLACEHOLDER))
        } else {
            return state
        }
    }
}, initialState)

export default productsReducer
