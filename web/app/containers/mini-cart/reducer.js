import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as cartActions from '../cart/actions'

const initialState = Immutable.fromJS({
    contentsLoaded: false,
})

export default handleActions({
    [cartActions.receiveCartContents]: (state) => state.set('contentsLoaded', true)
}, initialState)
