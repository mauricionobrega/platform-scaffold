import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as checkoutPaymentActions from './actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'

const initialState = Immutable.fromJS({
    isFixedPlaceOrderShown: true,
    hasExistingCreditCard: true
})

const checkoutPayment = handleActions({
    ...mergePayloadForActions(
        checkoutPaymentActions.toggleFixedPlaceOrder,
        checkoutPaymentActions.toggleCardInputRadio,
        checkoutPaymentActions.toggleCompanyAptField,
        checkoutPaymentActions.toggleNewAddressFields
    )
}, initialState)


export default checkoutPayment
