/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as parser from './parsers/parser'
import * as constants from './constants'
import * as utils from '../../utils/utils'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const receiveData = utils.createAction('Receive footer data')

export const process = ({payload: {$, $response}}) => receiveData({
    newsletter: parser.parseNewsLetter($response),
    navigation: parser.parseNavigation($, $response)
})

export const newsletterSignupComplete = utils.createAction('Newsletter signup complete',
    'signupStatus'
)

export const signUpToNewsletter = (action, method, data) => {
    return (dispatch) => {

        const onSuccess = () => {
            dispatch(newsletterSignupComplete(constants.SIGNUP_SUCCESSFUL))
        }

        const onFail = () => {
            dispatch(newsletterSignupComplete(constants.SIGNUP_FAILED))
        }

        return makeFormEncodedRequest(action, data, {method})
            .then(onSuccess)
            .catch(onFail)
    }
}
