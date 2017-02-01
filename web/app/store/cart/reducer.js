import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {receiveCartContents} from './actions'

const initialState = Immutable.fromJS({
    items: []
})

const cartReducer = handleActions({
    [receiveCartContents]: (state, {payload}) => state.mergeDeep(payload.cart)
}, initialState)

export default cartReducer
