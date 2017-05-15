import {fromJS} from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'

import * as messagingActions from './actions'

import {PAGE_VISIT_COUNT} from './constants'

const initialState = fromJS({
    subscribed: false,
    canSubscribe: false,
    channels: [],
    [PAGE_VISIT_COUNT]: 0
})

const pushMessagingReducer = handleActions({
    [messagingActions.stateUpdate]: mergePayload,
    [messagingActions.onPageVisitIncrement]: (state) => {
        return state.update(PAGE_VISIT_COUNT, (count) => ++count)
    },
    [messagingActions.onPageVisitRehydration]: (state, {payload}) => {
        return state.update(PAGE_VISIT_COUNT, (oldCount) => oldCount + payload)
    }
}, initialState)

export default pushMessagingReducer
