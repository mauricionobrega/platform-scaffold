import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as checkoutPaymentActions from './actions'
import {mergePayload} from '../../utils/reducer-utils'

const initialState = Immutable.fromJS({
    isCompanyOrAptShown: false,
    isFixedPlaceOrderShown: true,
})

const checkoutPayment = handleActions({
    [checkoutPaymentActions.toggleFixedPlaceOrder]: mergePayload
}, initialState)


export default checkoutPayment
