import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as headerActions from './actions'
import * as cartActions from '../cart/actions'
import {mergePayload} from '../../utils/reducer-utils'

export const initialState = Immutable.fromJS({
    isCollapsed: false,
    itemCount: 0
})

const header = handleActions({
    [headerActions.toggleHeader]: mergePayload,

    [cartActions.receiveCartContents]: (state, {payload}) => {
        return state.set('itemCount', payload.cart.summary_count)
    },
}, initialState)


export default header
