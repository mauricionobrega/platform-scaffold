import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {receiveCartContents} from '../../store/cart/actions'

const initialState = Immutable.fromJS({
    contentsLoaded: false,
})

export default handleActions({
    [receiveCartContents]: (state) => state.set('contentsLoaded', true)
}, initialState)
