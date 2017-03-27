import {handleActions} from 'redux-actions'
import {receiveFormInfo, receiveEntityID} from './actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'

import Immutable from 'immutable'

const initialState = Immutable.Map()

// Add Merlin's-specific actions here
const reducer = handleActions({
    ...mergePayloadForActions(receiveFormInfo, receiveEntityID)
}, initialState)

export default reducer
