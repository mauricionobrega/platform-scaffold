import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveNavigationData} from '../../integration-manager/responses'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveData} from './actions'

export const initialState = Immutable.fromJS({
    path: undefined,
    root: {},
})


export const reducer = handleActions({
    ...mergePayloadForActions(receiveNavigationData, receiveData)
}, initialState)


export default reducer
