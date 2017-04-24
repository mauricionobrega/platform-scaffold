import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import * as searchResultActions from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [searchResultActions.receiveData]: mergePayload,
    [searchResultActions.changeTitle]: mergePayload
}, initialState)
