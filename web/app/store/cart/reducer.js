import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {receiveCartContents} from './actions'
import {listMerger} from '../../utils/reducer-utils'


const cartReducer = handleActions({
    [receiveCartContents]: (state, {payload}) => state.mergeWith(listMerger, payload)
}, Immutable.Map())

export default cartReducer
