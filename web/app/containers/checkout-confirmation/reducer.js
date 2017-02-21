import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'

export default handleActions({
    ...mergePayloadForActions(checkoutConfirmationActions.receiveData),
    [checkoutConfirmationActions.showSuccessModal]: (state) => {
        return state.mergeDeep({isModalShown: true})
    },
    [checkoutConfirmationActions.hideModal]: (state) => {
        return state.mergeDeep({isModalShown: false})
    },
    [checkoutConfirmationActions.hideRegistrationForm]: (state) => {
        return state.mergeDeep({isRegistrationFormHidden: true})
    },
}, Immutable.Map())
