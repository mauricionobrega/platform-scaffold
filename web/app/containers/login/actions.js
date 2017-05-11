/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {createAction} from '../../utils/utils'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import isEmail from 'validator/lib/isEmail'
import {SubmissionError} from 'redux-form'
import {getLogin} from './selectors'
import {SIGN_IN_SECTION, REGISTER_SECTION} from './constants'

import {isFormResponseInvalid} from './parsers/common'
import signinParser from './parsers/signin'
import registerParser from './parsers/register'

import {isRunningInAstro, jsRpcMethod} from '../../utils/astro-integration'

export const receiveData = createAction('Receive Login Data')

export const process = ({payload: {$, $response, routeName}}) => {
    if (routeName === SIGN_IN_SECTION) {
        return receiveData({
            signinSection: signinParser($, $response)
        })
    } else if (routeName === REGISTER_SECTION) {
        return receiveData({
            registerSection: registerParser($, $response)
        })
    }
    // This shouldn't happen, but just in case...
    return receiveData()
}

const validateSignInForm = (formValues) => {
    const errors = {
        login: {}
    }
    if (!formValues.login) {
        return {
            _error: 'Please fill in the form'
        }
    }
    const email = formValues.login.username
    if (!email) {
        errors.login.username = 'Email address is required'
    } else if (!isEmail(email)) {
        errors.login.username = 'Email address is invalid'
    }
    const password = formValues.login.password
    if (!password) {
        errors.login.password = 'Password is required'
    }
    return errors
}

const validateRegisterForm = (formValues) => {
    const errors = {}

    if (!Object.keys(formValues).length) {
        return {
            _error: 'Please fill in the form'
        }
    }

    const {
        firstname,
        lastname,
        email,
        password,
        password_confirmation: passwordConfirmation
    } = formValues

    if (!firstname) {
        errors.firstname = 'First name is required'
    }

    if (!lastname) {
        errors.lastname = 'Last name is required'
    }

    if (!email) {
        errors.email = 'Email address is required'
    } else if (!isEmail(email)) {
        errors.email = 'Email address is invalid'
    }

    if (!password) {
        errors.password = 'Password is required'
    }

    if (password !== passwordConfirmation) {
        errors.password_confirmation = 'Passwords are not the same'
    }

    if (password.length < 6) {
        errors.password = 'Please enter 6 or more characters'
    }

    return errors
}

const sendForm = (href, formValues, formSelector, resolve, reject) => {
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

export const submitSignInForm = (formValues, resolve, reject) => {
    return (dispatch, getStore) => {
        const errors = validateSignInForm(formValues)
        if (errors._error || Object.keys(errors.login).length) {
            return reject(new SubmissionError(errors))
        }
        const loginData = getLogin(getStore()).toJS()
        const {href, hiddenInputs} = loginData.signinSection.form

        hiddenInputs.forEach((input) => {
            formValues[input.name] = input.value
        })

        return sendForm(href, formValues, '.form-login', resolve, reject)
    }
}

export const submitRegisterForm = (formValues, resolve, reject) => {
    return (dispatch, getStore) => {
        const errors = validateRegisterForm(formValues)
        if (errors._error || Object.keys(errors).length) {
            return reject(new SubmissionError(errors))
        }
        const loginData = getLogin(getStore()).toJS()
        const {href, hiddenInputs} = loginData.registerSection.form

        hiddenInputs.forEach((input) => {
            formValues[input.name] = input.value
        })

        return sendForm(href, formValues, '.form-create-account', resolve, reject)
    }
}

const findPathForRoute = (routes, routeName) => {
    const path = routes[0].childRoutes.find((route) => route.routeName === routeName).path
    return `/${path}`
}

/**
 * Uses React router to navigate between different pages. Takes care of browser history, etc.
 */
export const navigateToSection = (router, routes, sectionName) => {
    return () => {
        router.push(findPathForRoute(routes, sectionName))
    }
}
