import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as headerActions from './actions'
import {mergePayload} from '../../utils/reducer-utils'

export const initialState = Immutable.fromJS({
    isCollapsed: false
})

const header = handleActions({
    [headerActions.toggleHeader]: mergePayload,
}, initialState)


export default header
