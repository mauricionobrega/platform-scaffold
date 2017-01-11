import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
// import * as appActions from '../app/actions'
import * as headerActions from './actions'
import * as cartActions from '../cart/actions'

export const initialState = Immutable.fromJS({
    isCollapsed: false
})

const header = handleActions({

    [headerActions.toggleHeader]: (state, {payload}) => {
        return state.set('isCollapsed', payload.isCollapsed)
    },

    [cartActions.receiveCartContents]: (state, {payload}) => {
        return state.mergeDeep(payload)
    },

}, initialState)


export default header
