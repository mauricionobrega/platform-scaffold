import {handleActions} from 'redux-actions'
import {receiveFormInfo} from '../actions'

import Immutable from 'immutable'

const initialState = Immutable.Map()

const reducer = handleActions({
    [receiveFormInfo]: (state) => state
}, initialState)

export default reducer
