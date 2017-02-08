import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as checkoutPaymentActions from './actions'
import {mergePayload} from '../../utils/reducer-utils'

const initialState = Immutable.fromJS({
    isFixedPlaceOrderShown: true,
    hasExistingCreditCard: true
})

const checkoutPayment = handleActions({
    [checkoutPaymentActions.toggleFixedPlaceOrder]: mergePayload,
    [checkoutPaymentActions.toggleCardInputRadio]: mergePayload,
    [checkoutPaymentActions.toggleCompanyAptField]: mergePayload,
    [checkoutPaymentActions.toggleNewAddressFields]: mergePayload
}, initialState)


export default checkoutPayment
