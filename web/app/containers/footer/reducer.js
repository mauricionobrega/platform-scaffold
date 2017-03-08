import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as footerActions from './actions'
import * as constants from './constants'
import {receiveFooterData} from '../../integration-manager/responses'

import {mergePayloadForActions} from '../../utils/reducer-utils'
import {TextLink} from '../../utils/parser-utils'

export const initialState = Immutable.fromJS({
    newsletter: null,
    navigation: new Array(5).fill(TextLink()),
    signupStatus: constants.SIGNUP_NOT_ATTEMPTED
})

const footer = handleActions({
    ...mergePayloadForActions(receiveFooterData, footerActions.receiveData, footerActions.newsletterSignupComplete)
}, initialState)


export default footer
