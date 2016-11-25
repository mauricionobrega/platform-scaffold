import {createReducer} from 'redux-act'
import {fromJS} from 'immutable'

import {onPageReceived} from '../app/actions'
import homeParser from './parsers/home'

const CATEGORY_PLACEHOLDER_COUNT = 6

const initialState = fromJS({
    categories: new Array(CATEGORY_PLACEHOLDER_COUNT).fill(''),
    banners: []
})

export default createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageType} = action

        if (pageType === 'Home') {
            return state.mergeDeep(homeParser($, $response))
        } else {
            return state
        }
    }
}, initialState)
