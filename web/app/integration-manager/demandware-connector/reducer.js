import {handleActions} from 'redux-actions'

import Immutable from 'immutable'

const initialState = Immutable.Map()

const reducer = handleActions({}, initialState)

export default reducer
