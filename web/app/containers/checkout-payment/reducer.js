import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as checkoutPaymentActions from './actions'
import {DEFAULT_CARD} from './constants'
import {mergePayloadForActions} from '../../utils/reducer-utils'

const initialState = Immutable.fromJS({
    isFixedPlaceOrderShown: true,
    hasExistingCreditCard: true,
    cvvType: DEFAULT_CARD
})

const checkoutPayment = handleActions({
    ...mergePayloadForActions(
        checkoutPaymentActions.toggleFixedPlaceOrder,
        checkoutPaymentActions.toggleCardInputRadio,
        checkoutPaymentActions.toggleCompanyAptField,
        checkoutPaymentActions.toggleNewAddressFields,
        checkoutPaymentActions.setCvvType
    )
}, initialState)


export default checkoutPayment
