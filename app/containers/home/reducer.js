import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'

import {isPageType} from '../../utils/router-utils'
import {onPageReceived} from '../app/actions'
import homeParser from './parsers/home'
import Home from './container'

const CATEGORY_PLACEHOLDER_COUNT = 6

const initialState = fromJS({
    categories: new Array(CATEGORY_PLACEHOLDER_COUNT).fill({}),
    banners: []
})

export default handleActions({
    [onPageReceived]: (state, {payload}) => {
        const {$, $response, pageComponent} = payload

        if (isPageType(pageComponent, Home)) {
            return state.mergeDeep(homeParser($, $response))
        } else {
            return state
        }
    }
}, initialState)
