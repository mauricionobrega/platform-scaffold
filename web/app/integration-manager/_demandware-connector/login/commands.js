import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {receiveLoginPageData} from '../../login/responses'
import {receiveAppData} from '../../responses'
import {initDemandwareSession} from '../utils'
import {getCart} from '../app/commands'
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

export const login = (href, {login}, resolve, reject) => (dispatch) => {

    const authorizationData = window.btoa(`${login.username}:${login.password}`)
    const requestOptions = {
        method: 'POST',
        body: '{type: "credentials"}',
        headers: {
            ...REQUEST_HEADERS,
            Authorization: `Basic ${authorizationData}`
        }
    }
    let responseHeaders
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, requestOptions)
        .then((response) => {
            responseHeaders = response.headers
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.fault) {
                return reject(new SubmissionError({_error: 'Username or password is incorrect'}))
            }
            const authorization = responseHeaders.get('Authorization')
            document.cookie = `mob-session-auth=${authorization}`
            return initDemandwareSession(authorization)
                .then(() => {
                    dispatch(receiveAppData({isLoggedIn: true}))
                    return dispatch(getCart())
                })
                .then(() => {
                    // Navigate to the homepage, since we haven't made an account page yet
                    // and demandware's account page is at the same URL as their login page
                    return '/on/demandware.store/Sites-2017refresh-Site/default/Home-Show'
                })

        })
}

export const registerUser = (href, formValues, resolve, reject) => (dispatch) => {
    return dispatch()
}
