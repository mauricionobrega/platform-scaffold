import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as appActions from '../app/actions'
import * as navActions from './actions'
import * as parser from './parsers/parser'

export const initialState = Immutable.fromJS({
    isOpen: false,
    path: undefined,
    root: {},
})


export const reducer = handleActions({
    [appActions.onPageReceived]: (state, {payload}) => {
        const {$, $response} = payload
        const parsed = Immutable.fromJS(parser.parseNavigation($, $response))
        return state.merge(parsed)
    },

    [navActions.openNavigation]: (state) => {
        return state.set('isOpen', true)
    },

    [navActions.closeNavigation]: (state) => {
        return state.set('isOpen', false)
    }

}, initialState)


export default reducer
