import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCategory, changeSortOption} from './actions'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    [changeSortOption]: mergePayload,
    [receiveCategory]: mergePayload
}, initialState)

export default categoryReducer
