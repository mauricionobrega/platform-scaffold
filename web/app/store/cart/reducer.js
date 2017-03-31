import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {receiveCartContents} from '../../integration-manager/cart'
import {mergeSkipLists} from '../../utils/reducer-utils'


const cartReducer = handleActions({
    [receiveCartContents]: (state, {payload}) => state.mergeWith(mergeSkipLists, payload)
}, Immutable.Map())

export default cartReducer
