import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {SubmissionError} from 'redux-form'

import {isRunningInAstro, jsRpcMethod} from '../../../utils/astro-integration'
import {isFormResponseInvalid} from './parsers/common'


export const submitLoginForm = (href, formValues, formSelector, resolve, reject) => {
    return makeFormEncodedRequest(href, formValues, {method: 'POST'})
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            if (isFormResponseInvalid($response, formSelector)) {
                const error = {
                    _error: 'Username or password is incorrect'
                }
                return reject(new SubmissionError(error))
            }
            if (isRunningInAstro) {
                jsRpcMethod('user:loggedIn', [])()
            }
            window.location.href = '/customer/account'
            return resolve(true)
        })
        .catch((error) => {
            if (error.name !== SubmissionError) {
                reject(new SubmissionError({_error: 'Failed to login due to network error.'}))
            }
        })
}
