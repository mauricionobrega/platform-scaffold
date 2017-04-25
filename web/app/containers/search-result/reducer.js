import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {onRouteChanged} from '../app/actions'

const initialState = Immutable.Map()

const searchResultReducer = handleActions({
    [onRouteChanged]: /* istanbul ignore next */(state) => state
}, initialState)

export default searchResultReducer
