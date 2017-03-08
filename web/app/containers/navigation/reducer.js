import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveNavigationData} from '../../integration-manager/responses'
import {mergePayloadForActions} from '../../utils/reducer-utils'

export const initialState = Immutable.fromJS({
    path: undefined,
    root: {},
})


export const reducer = handleActions({
    ...mergePayloadForActions(receiveNavigationData)
}, initialState)


export default reducer
