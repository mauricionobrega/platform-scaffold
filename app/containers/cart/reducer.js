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
    // Do we want to store static data like this elsewhere?
    countries: [
        'Canada',
        'United Kingdom',
        'United States'
    ],
    stateProvinces: [
        'British Columbia',
        'Ontario',
        'Washington',
        'California'
    ]
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
