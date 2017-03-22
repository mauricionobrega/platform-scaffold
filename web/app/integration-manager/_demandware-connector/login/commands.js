import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {receiveLoginPageData} from '../../login/responses'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'

import {SIGN_IN_URL, API_END_POINT_URL, REQUEST_HEADERS} from '../constants'

export const fetchLoginData = () => (dispatch) => {
    return new Promise(() => {
        return dispatch(receiveLoginPageData({
            signinSection: {
                heading: 'RETURNING CUSTOMERS',
                description: 'If you are a registered user, please enter your email and password.',
                requiredText: '* Required Fields',
                isFormLoaded: true,
                href: SIGN_IN_URL
            },
            registerSection: {
                heading: 'NEW CUSTOMERS',
                description: 'Creating an account is easy. Just fill out the form below and enjoy the benefits of being a registered customer.',
                requiredText: '* Required Fields',
                href: `${SIGN_IN_URL}/create`,
                isFormLoaded: true,
                form: {
                    sections: [{
                        heading: 'Personal Information',

                    }, {
                        heading: 'Sign-in Information',
                    }]
                }
            }
        }))
    })
}

export const navigateToSection = () => (dispatch) => noop()

export const submitLoginForm = (href, {login}, resolve, reject) => (dispatch) => {
    const authorizationData = window.btoa(`${login.username}:${login.password}`)
    const requestOptions = {
        method: 'POST',
        body: '{type: "credentials"}',
        headers: {
            ...REQUEST_HEADERS,
            Authorization: `Basic ${authorizationData}`
        }
    }
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                return reject(new SubmissionError({_error: 'Unable to login, please check your credentials and try again.'}))
            }
            return resolve()
        })
}

export const submitRegistrationForm = (href, formValues, resolve, reject) => (dispatch) => {
    return dispatch()
}
