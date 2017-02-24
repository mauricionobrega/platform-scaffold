import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import * as startersKitActions from './actions'

const initialState = Immutable.Map()

export default handleActions({
    ...mergePayloadForActions(
        startersKitActions.receiveData,
        startersKitActions.receiveShowAll
    )
}, initialState)
