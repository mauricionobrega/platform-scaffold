import {handleActions} from 'redux-actions'

import {baseInitialState, isPageType, getNextSelector} from '../../utils/router-utils'
import {onRouteChanged} from '../app/actions'
import {SELECTOR} from '../app/constants'

import PLP from './container'
import * as plpActions from './actions'

const plpReducer = handleActions({
    // ...mergePayloadForActions(plpActions.receiveData),
    [plpActions.receiveData]: (state, {payload}) => {
        const {selector} = payload
        return state.mergeDeep({selector})
    },
    [onRouteChanged]: (state, {payload}) => {
        const {pageComponent, currentURL} = payload

        return isPageType(pageComponent, PLP) ? state.set(SELECTOR, getNextSelector(state, currentURL)) : state
    }
}, baseInitialState)

export default plpReducer
