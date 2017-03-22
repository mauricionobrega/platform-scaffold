import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {SubmissionError} from 'redux-form'

import {fetchPageData} from '../app/commands'
import {receiveLoginPageData} from '../../login/responses'

import {isFormResponseInvalid} from './parsers/common'
import signinParser from './parsers/signin'
import registerParser from './parsers/register'


export const fetchLoginData = (url, routeName) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            if (routeName === 'signin') {
                return dispatch(receiveLoginPageData({
                    signinSection: signinParser($, $response)
                }))
            } else if (routeName === 'register') {
                return dispatch(receiveLoginPageData({
                    registerSection: registerParser($, $response)
                }))
            }

            return dispatch(receiveLoginPageData())
        })
}

const submitForm = (href, formValues, formSelector, resolve, reject) => {
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
            return '/customer/account'
        })
        .catch((error) => {
            if (error.name !== SubmissionError) {
                reject(new SubmissionError({_error: 'Failed to login due to network error.'}))
            }
        })
}

export const login = (href, formValues, resolve, reject) =>
    submitForm(href, formValues, '.form-login', resolve, reject)

export const registerUser = (href, formValues, resolve, reject) =>
    submitForm(href, formValues, '.form-create-account', resolve, reject)
