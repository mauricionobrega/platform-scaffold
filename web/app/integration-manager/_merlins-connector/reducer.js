import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveFormInfo, receiveEntityID, receiveFormKey, receiveLoginHref, receiveRegisterHref} from './actions'

import Immutable from 'immutable'

const initialState = Immutable.Map()

// Add Merlin's-specific actions here
const reducer = handleActions({
    [receiveFormInfo]: mergePayload,
    [receiveEntityID]: mergePayload,
    [receiveFormKey]: mergePayload,
    [receiveLoginHref]: mergePayload,
    [receiveRegisterHref]: mergePayload
}, initialState)

export default reducer
