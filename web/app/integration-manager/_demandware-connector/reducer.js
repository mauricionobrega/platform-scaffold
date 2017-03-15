import {handleActions} from 'redux-actions'

import Immutable from 'immutable'

// import {someAction} from './actions'

const initialState = Immutable.Map()

// Add Demandware-specific actions here
const reducer = handleActions({
    // [someAction]: (state, {payload}) => state.mergeDeep(payload)
}, initialState)

export default reducer
