import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {setRemoveItemId, setIsWishlistComplete, setTaxRequestPending} from './actions'


export default handleActions({
    [setTaxRequestPending]: mergePayload,
    [setRemoveItemId]: mergePayload,
    [setIsWishlistComplete]: mergePayload
}, Immutable.Map())
