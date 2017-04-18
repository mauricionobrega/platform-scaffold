import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as footerActions from './actions'
import * as constants from './constants'

import {mergePayload} from '../../utils/reducer-utils'

export const initialState = Immutable.fromJS({
    signupStatus: constants.SIGNUP_NOT_ATTEMPTED
})

const footer = handleActions({
    [footerActions.newsletterSignupComplete]: mergePayload
}, initialState)


export default footer
