import Immutable from 'immutable'
import {createReducer} from 'redux-act'
// import * as appActions from '../app/actions'
// import * as headerActions from './actions'
// import * as cartActions from '../cart/actions'

export const initialState = Immutable.fromJS({
})

const header = createReducer({

}, initialState)


export default header
