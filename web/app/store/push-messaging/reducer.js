import {fromJS} from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'

import * as messagingActions from './actions'

import {PAGE_COUNT, VISIT_COUNTDOWN} from './constants'

const setCountdown = (state, {payload}) => state.set(VISIT_COUNTDOWN, payload)

const initialState = fromJS({
    subscribed: false,
    canSubscribe: false,
    channels: [],
    [PAGE_COUNT]: 0,
    [VISIT_COUNTDOWN]: false
})

const pushMessagingReducer = handleActions({
    [messagingActions.stateUpdate]: mergePayload,
    [messagingActions.onRehydratedPageCount]: (state, {payload}) => {
        return state.update(PAGE_COUNT, (pageCount) => pageCount + payload)
    },
    [messagingActions.onPageCountIncrement]: (state) => {
        return state.update(PAGE_COUNT, (pageCOunt) => ++pageCOunt)
    },
    [messagingActions.onRehydratedVisitCountdown]: setCountdown,
    [messagingActions.onVisitCountdownSet]: setCountdown,
    [messagingActions.onVisitCountdownDecrement]: (state) => {
        return state.update(VISIT_COUNTDOWN, (visitCountdown) => {
            // Don't really want this to get lower than 0, though it doesn't matter
            return Math.max(--visitCountdown, 0)
        })
    }
}, initialState)

export default pushMessagingReducer
