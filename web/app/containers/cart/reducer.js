import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveCartContents} from '../../store/cart/actions'

const initialState = Immutable.fromJS({
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

export default handleActions({
    [receiveCartContents]: (state) => state
}, initialState)
