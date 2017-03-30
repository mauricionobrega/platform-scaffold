import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'
import {mergePayload} from '../../utils/reducer-utils'

export default handleActions({
    [checkoutConfirmationActions.receiveData]: mergePayload,
    [checkoutConfirmationActions.hideRegistrationForm]: (state) => {
        return state.set('isRegistrationFormHidden', true)
    }
}, Immutable.Map())
