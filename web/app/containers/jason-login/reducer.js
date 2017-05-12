import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import * as jasonLoginActions from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [jasonLoginActions.receiveData]: mergePayload,
    [jasonLoginActions.changeTitle]: mergePayload
}, initialState)
