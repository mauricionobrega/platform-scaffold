import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveCartContents} from '../../store/cart/actions'


export default handleActions({
    [receiveCartContents]: (state) => state
}, Immutable.Map())
