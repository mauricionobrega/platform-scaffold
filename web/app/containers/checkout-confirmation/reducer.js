import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: false,
    isLoggedIn: false,
    isRegistrationFormHidden: false,
    isModalShown: false,
    orderNumber: '',
    orderUrl: ''
})

export default handleActions({
    [checkoutConfirmationActions.receiveContents]: (state, {payload}) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    },
    [checkoutConfirmationActions.showSuccessModal]: (state) => {
        return state.mergeDeep({isModalShown: true})
    },
    [checkoutConfirmationActions.hideModal]: (state) => {
        return state.mergeDeep({isModalShown: false})
    },
    [checkoutConfirmationActions.hideRegistrationForm]: (state) => {
        return state.mergeDeep({isRegistrationFormHidden: true})
    },
}, initialState)
