import {createReducer} from 'redux-act'
import {Map} from 'immutable'

import * as plpActions from './actions'

const initialState = Map({
    title: "",
    products: []
})

export default createReducer({
    [plpActions.receivePlpContents]: (state, payload) => {
        return state.mergeDeep(payload)
    }
}, initialState)
