import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as cartActions from './actions'

const initialState = Immutable.fromJS({
    items: [],
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
    }
}, initialState)
