import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as cartActions from './actions'

const initialState = Immutable.fromJS({
    items: [],
    contentsLoaded: false,
    estimateShippingModal: {
        isOpen: false
    },
    wishlistModal: {
        isOpen: false
    },
})

export default createReducer({
    [cartActions.toggleEstimateShippingModal]: (state, payload) => {
        return state.mergeDeep({
            estimateShippingModal: {
                isOpen: payload.isOpen
            }
        })
    },
    [cartActions.toggleWishlistModal]: (state, payload) => {
        return state.mergeDeep({
            wishlistModal: {
                isOpen: payload.isOpen
            }
        })
    }
}, initialState)
