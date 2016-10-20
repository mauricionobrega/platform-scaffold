import {createReducer} from 'redux-act'
import {Map} from 'immutable'

import * as plpActions from './actions'

const initialState = Map({
    title: '',
    numItems: '',
    products: ['', '', '', ''],
    loaded: false
})

export default createReducer({
    [plpActions.receivePlpContents]: (state, payload) => {
        return state.merge(payload).set('loaded', true)
    }
}, initialState)
