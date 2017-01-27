import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as cartActions from '../cart/actions'

const initialState = Immutable.fromJS({
    contentsLoaded: false,
    cart: {
        items: [],
        subtotal: ''
    }
})

export default handleActions({
    [cartActions.receiveCartContents]: (state, {payload}) => {
        return state.mergeDeep(
            {contentsLoaded: true},
            payload)
    }
}, initialState)
