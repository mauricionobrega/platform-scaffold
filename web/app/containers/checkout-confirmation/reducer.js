import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'

export default handleActions({
    ...mergePayloadForActions(checkoutConfirmationActions.receiveData),
    [checkoutConfirmationActions.hideRegistrationForm]: (state) => {
        return state.mergeDeep({isRegistrationFormHidden: true})
    },
}, Immutable.Map())
