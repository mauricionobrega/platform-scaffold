import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import * as privacyPageActions from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [privacyPageActions.receiveData]: mergePayload,
    [privacyPageActions.changeTitle]: mergePayload
}, initialState)
