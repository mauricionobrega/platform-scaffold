import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {onRouteChanged} from '../app/actions'

// This is now a placeholder; it may be removed down the road.

const plpReducer = handleActions({
    [onRouteChanged]: (state) => state
}, Immutable.Map())

export default plpReducer
