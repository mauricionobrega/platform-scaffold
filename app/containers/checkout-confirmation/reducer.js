import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: true,
    testText: 'Confirmation'
})

export default handleActions({
    [checkoutConfirmationActions.receiveContents]: (state, {payload}) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    }
}, initialState)
