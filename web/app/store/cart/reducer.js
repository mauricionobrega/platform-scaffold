import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {receiveCartContents} from './actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'

const initialState = Immutable.fromJS({})

const cartReducer = handleActions({
    ...mergePayloadForActions(receiveCartContents)
}, initialState)

export default cartReducer
