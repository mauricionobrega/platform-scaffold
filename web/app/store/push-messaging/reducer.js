import {fromJS} from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'

import * as messagingActions from './actions'

const initialState = fromJS({
    canShowSoftAsk: false
})

const pushMessagingReducer = handleActions({
    [messagingActions.toggleCanShowSoftAsk]: (state, {payload}) => {
        return state.set('canShowSoftAsk', payload.canShow)
    }
}, initialState)

export default pushMessagingReducer
