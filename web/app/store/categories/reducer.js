import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCategory, receiveCategoryInformation} from '../../integration-manager/categories/responses'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    [receiveCategory]: mergePayload,
    [receiveCategoryInformation]: mergePayload
}, initialState)

export default categoryReducer
