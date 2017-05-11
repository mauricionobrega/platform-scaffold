import {fromJS} from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'

import * as messagingActions from './actions'

const initialState = fromJS({
    subscribed: false,
    canSubscribe: false,
    channels: []
})

const pushMessagingReducer = handleActions({
    [messagingActions.stateUpdate]: mergePayload
}, initialState)

export default pushMessagingReducer
