import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {receiveCartContents} from './actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'

const cartReducer = handleActions({
    ...mergePayloadForActions(receiveCartContents)
}, Immutable.Map())

export default cartReducer
