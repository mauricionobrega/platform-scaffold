import {createReducer} from 'redux-act'
import {fromJS} from 'immutable'

import {isPageType} from '../../utils/router-utils'
import {onPageReceived} from '../app/actions'
import homeParser from './parsers/home'
import Home from './container'

const CATEGORY_PLACEHOLDER_COUNT = 6

const initialState = fromJS({
    categories: new Array(CATEGORY_PLACEHOLDER_COUNT).fill(''),
    banners: []
})

export default createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageComponent} = action

        if (isPageType(pageComponent, Home)) {
            return state.mergeDeep(homeParser($, $response))
        } else {
            return state
        }
    }
}, initialState)
