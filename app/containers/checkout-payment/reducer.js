import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as checkoutPaymentActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: true,
    miniCart: {
        cart: {}
    },
    isCompanyOrAptShown: false,
    isFixedPlaceOrderShown: true,
})

export default createReducer({
    [checkoutPaymentActions.receiveContents]: (state, payload) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    },
    [checkoutPaymentActions.showCompanyAndApt]: (state) => {
        return state.merge({isCompanyOrAptShown: true})
    },
    [checkoutPaymentActions.toggleFixedPlaceOrder]: (state, payload) => {
        return state.merge({isFixedPlaceOrderShown: payload})
    },
}, initialState)
