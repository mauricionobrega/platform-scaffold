import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as checkoutPaymentActions from './actions'
import {receiveHasExistingCard} from '../../integration-manager/checkout/responses'
import {DEFAULT_CARD} from './constants'
import {mergePayload} from '../../utils/reducer-utils'

const initialState = Immutable.fromJS({
    isFixedPlaceOrderShown: true,
    cvvType: DEFAULT_CARD
})

const checkoutPayment = handleActions({
    [checkoutPaymentActions.toggleFixedPlaceOrder]: mergePayload,
    [checkoutPaymentActions.toggleCardInputRadio]: mergePayload,
    [checkoutPaymentActions.toggleCompanyAptField]: mergePayload,
    [checkoutPaymentActions.toggleNewAddressFields]: mergePayload,
    [checkoutPaymentActions.setCvvType]: mergePayload,
    [receiveHasExistingCard]: mergePayload
}, initialState)


export default checkoutPayment
