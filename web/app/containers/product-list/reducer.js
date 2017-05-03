import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {changeSelectedSort} from './actions'
import {mergePayload} from '../../utils/reducer-utils'

const productListReducer = handleActions({
    [changeSelectedSort]: mergePayload
}, Immutable.Map())

export default productListReducer
