import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCartContents} from '../../store/cart/actions'
import {receiveData} from './actions'

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
    ...mergePayloadForActions(receiveData),
    [receiveCartContents]: (state) => state
}, initialState)
