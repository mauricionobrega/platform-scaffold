import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import * as productDeetsActions from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [productDeetsActions.receiveData]: mergePayload,
}, initialState)
