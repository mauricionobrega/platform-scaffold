import {handleActions} from 'redux-actions'
import {receiveFormInfo, receiveFormKey, receiveLoginHref, receiveRegisterHref} from './actions'

import Immutable from 'immutable'

const initialState = Immutable.Map()

// Add Merlin's-specific actions here
const reducer = handleActions({
    [receiveFormInfo]: (state, {payload}) => state.mergeDeep(payload),
    [receiveFormKey]: (state, {payload}) => state.mergeDeep(payload),
    [receiveLoginHref]: (state, {payload}) => state.mergeDeep(payload),
    [receiveRegisterHref]: (state, {payload}) => state.mergeDeep(payload)
}, initialState)

export default reducer
