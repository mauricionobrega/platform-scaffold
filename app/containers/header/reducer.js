import Immutable from 'immutable'
import {createReducer} from 'redux-act'
// import * as appActions from '../app/actions'
import * as headerActions from './actions'

export const initialState = Immutable.fromJS({
    isCollapsed: false
})

const header = createReducer({

    [headerActions.toggleHeader]: (state) => {
        return state.set('isCollapsed', !state.get('isCollapsed'))
    },

}, initialState)


export default header
