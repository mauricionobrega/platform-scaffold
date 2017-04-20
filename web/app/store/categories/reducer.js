import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCategory, changeSort} from './actions'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    [changeSort]: mergePayload,
    [receiveCategory]: mergePayload
}, initialState)

export default categoryReducer
