import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'
import {receiveCheckoutConfirmationData} from '../../integration-manager/checkout/responses'
import {mergePayload} from '../../utils/reducer-utils'

export default handleActions({
    [receiveCheckoutConfirmationData]: mergePayload,
    [checkoutConfirmationActions.hideRegistrationForm]: (state) => {
        return state.set('isRegistrationFormHidden', true)
    }
}, Immutable.Map())
