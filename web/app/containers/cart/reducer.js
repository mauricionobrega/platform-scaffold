import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveData, setRemoveItemId, setIsWishlistComplete} from './actions'


export default handleActions({
    [receiveData]: mergePayload,
    [setRemoveItemId]: mergePayload,
    [setIsWishlistComplete]: mergePayload
}, Immutable.Map())
