import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
// import * as cartActions from './actions'
import * as cartActions from '../../containers/cart/actions'

const initialState = Immutable.fromJS({
    items: []
})

const cartReducer = handleActions({
    [cartActions.receiveCartContents]: (state, {payload}) => state.mergeDeep(payload.cart)
}, initialState)

export default cartReducer
