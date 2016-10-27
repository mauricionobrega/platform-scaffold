import {createReducer} from 'redux-act'
import {Map} from 'immutable'

import {onPageReceived} from '../app/actions'
import homeParser from './parsers/home'

const initialState = Map({
    categories: ['', '', '', ''],
    banners: false
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
