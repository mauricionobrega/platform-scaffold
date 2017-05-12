/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as footerActions from './actions'
import * as constants from './constants'
import {mergePayload} from '../../utils/reducer-utils'
import {TextLink} from '../../utils/parser-utils'

export const initialState = Immutable.fromJS({
    newsletter: null,
    navigation: new Array(5).fill(TextLink()),
    signupStatus: constants.SIGNUP_NOT_ATTEMPTED
})

const footer = handleActions({
    [footerActions.receiveData]: mergePayload,
    [footerActions.newsletterSignupComplete]: mergePayload
}, initialState)


export default footer
