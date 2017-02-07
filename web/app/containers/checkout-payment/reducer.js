import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as checkoutPaymentActions from './actions'
import {mergePayload} from '../../utils/reducer-utils'

const initialState = Immutable.fromJS({
    isCompanyOrAptShown: false,
    isFixedPlaceOrderShown: true,
    hasExistingCreditCard: true,
    isNewCardInputSelected: false
})

const checkoutPayment = handleActions({
    [checkoutPaymentActions.toggleFixedPlaceOrder]: mergePayload,
    [checkoutPaymentActions.toggleCardInputRadio]: mergePayload
}, initialState)


export default checkoutPayment
