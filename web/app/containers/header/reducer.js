import Immutable from 'immutable'
import {createReducer} from 'redux-act'
import * as headerActions from './actions'
import * as cartActions from '../cart/actions'

export const initialState = Immutable.fromJS({
    isCollapsed: false,
    itemCount: 0
})

const header = createReducer({

    [headerActions.toggleHeader]: (state, payload) => {
        return state.set('isCollapsed', payload.isCollapsed)
    },

    [cartActions.receiveCartContents]: (state, payload) => {
        return state.set('itemCount', payload.cart.summary_count)
    },

}, initialState)


export default header
