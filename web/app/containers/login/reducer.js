import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {setSigninLoaded, setRegisterLoaded} from '../../integration-manager/login/results'

const initialState = Immutable.fromJS({
    signinSection: false,
    registerSection: false
})

export default handleActions({
    [setSigninLoaded]: (state) => state.set('signinSection', true),
    [setRegisterLoaded]: (state) => state.set('registerSection', true)
}, initialState)
