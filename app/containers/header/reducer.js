import Immutable from 'immutable'
import {createReducer} from 'redux-act'
// import * as appActions from '../app/actions'
import * as headerActions from './actions'

export const initialState = Immutable.fromJS({
    isCollapsed: false
})

const header = createReducer({

    [headerActions.shrinkHeader]: (state, action) => {
        return state.set('isCollapsed', true)
    },

    [headerActions.expandHeader]: (state, action) => {
        return state.set('isCollapsed', false)
    },

}, initialState)


export default header
