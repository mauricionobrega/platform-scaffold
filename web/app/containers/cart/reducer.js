import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as cartActions from './actions'

const initialState = Immutable.fromJS({
    items: [],
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
    [cartActions.receiveCartContents]: (state) => state
}, initialState)
