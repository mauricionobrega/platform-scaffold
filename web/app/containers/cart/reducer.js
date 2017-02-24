import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveData, setRemoveItemId, setIsWishlistComplete} from './actions'


export default handleActions({
    ...mergePayloadForActions(receiveData, setRemoveItemId, setIsWishlistComplete)
}, Immutable.Map())
