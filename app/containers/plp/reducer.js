import {handleActions} from 'redux-actions'

import {baseInitialState, isPageType, getNextSelector} from '../../utils/router-utils'
import {onRouteChanged} from '../app/actions'
import {SELECTOR} from '../app/constants'

import PLP from './container'
import {setCurrentPLPUrl} from './actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'

const plpReducer = handleActions({
    ...mergePayloadForActions(setCurrentPLPUrl),
    [onRouteChanged]: (state, {payload}) => {
        const {pageComponent, currentURL} = payload

        return isPageType(pageComponent, PLP) ? state.set(SELECTOR, getNextSelector(state, currentURL)) : state
    }
}, baseInitialState)

export default plpReducer
