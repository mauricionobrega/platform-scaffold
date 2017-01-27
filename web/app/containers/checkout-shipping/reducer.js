import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as checkoutShippingActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: true,
    isCompanyOrAptShown: false,
})

export default createReducer({
    [checkoutShippingActions.receiveContents]: (state, payload) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    },
    [checkoutShippingActions.showCompanyAndApt]: (state) => {
        return state.merge({isCompanyOrAptShown: true})
    }
}, initialState)
