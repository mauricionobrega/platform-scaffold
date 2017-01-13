import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutPaymentActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: true,
    miniCart: {
        cart: {}
    }
})

export default handleActions({
    [checkoutPaymentActions.receiveContents]: (state, {payload}) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    }
}, initialState)
