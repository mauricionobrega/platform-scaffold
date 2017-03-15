import {handleActions} from 'redux-actions'
import {receiveFormInfo} from './actions'

import Immutable from 'immutable'

const initialState = Immutable.Map()

// Add Merlin's-specific actions here
const reducer = handleActions({
    [receiveFormInfo]: (state, {payload}) => state.mergeDeep(payload)
}, initialState)

export default reducer
