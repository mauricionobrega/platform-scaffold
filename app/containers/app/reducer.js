import {createReducer} from 'redux-act'
import * as appActions from './actions'

const initialState = {
    preloaderRemoved: false,
}

export default createReducer({
    [appActions.preloaderRemoved]: (state) => ({
        ...state,
        preloaderRemoved: true
    }),
}, initialState)
