import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as miniCartActions from './actions'
import * as cartActions from '../cart/actions'

const initialState = Immutable.fromJS({
    isOpen: false,
    contentsLoaded: false,
    cart: {
        items: [],
        shipping_rate_label: 'Flat Rate - Fixed',
        shipping_rate: '$25.00',
        promo_rate_label: false, // 'Promo discount',
        promo_rate: null, // '-$5.00',
        total_incl_tax: '$146.00',
    }
})

export default handleActions({
    [cartActions.receiveCartContents]: (state, {payload}) => {
        return state.mergeDeep(
            {contentsLoaded: true},
            payload)
    },

    [miniCartActions.closeMiniCart]: (state) => {
        return state.set('isOpen', false)
    },

    [miniCartActions.openMiniCart]: (state) => {
        return state.set('isOpen', true)
    }

}, initialState)
