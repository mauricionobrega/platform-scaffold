import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {TextLink} from '../../../utils/parser-utils'

import {isPageType} from '../../../utils/router-utils'
import {mergePayload} from '../../../utils/reducer-utils'

import PDP from '../../pdp/container'
import {receivePlpProductData, receivePdpProductData} from './actions'

import {onRouteChanged} from '../../app/actions'
import {PLACEHOLDER} from '../../app/constants'

export const initialState = Immutable.fromJS({
    [PLACEHOLDER]: {
        title: '',
        price: '',
        link: TextLink(),
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
    [receivePlpProductData]: (state, {payload}) =>
        state.mergeDeepWith((prev, next) => prev || next, payload),
    [receivePdpProductData]: mergePayload,
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
