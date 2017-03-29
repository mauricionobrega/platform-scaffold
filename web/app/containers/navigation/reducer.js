import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveNavigationData, setLoggedIn} from '../../integration-manager/responses'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveData, setNavigationPath} from './actions'
import {SIGN_IN_LINK_TEXT, ACCOUNT_LINK_TEXT} from './constants'

export const initialState = Immutable.fromJS({
    path: undefined,
    root: {},
})


export const reducer = handleActions({
    ...mergePayloadForActions(receiveNavigationData, receiveData, setNavigationPath),
    [setLoggedIn]: (state, {payload: {isLoggedIn}}) => {
        return state.setIn(
            ['root', 'children', 0, 'title'],
            isLoggedIn ? ACCOUNT_LINK_TEXT : SIGN_IN_LINK_TEXT
        )
    }
}, initialState)


export default reducer
