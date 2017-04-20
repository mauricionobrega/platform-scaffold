import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCategory, changeFilter} from './actions'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    [changeFilter]: mergePayload,
    [receiveCategory]: mergePayload
}, initialState)

export default categoryReducer
