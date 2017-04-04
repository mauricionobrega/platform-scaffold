import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {SubmissionError} from 'redux-form'

import {receiveLoginHref, receiveRegisterHref} from '../actions'
import {getLoginHref, getFormKey, getRegisterHref} from '../selectors'
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
                const form = signinParser($, $response)
                dispatch(receiveLoginHref(form.href))
                return dispatch(receiveLoginPageData({
                    signinSection: {
                        isFormLoaded: true,
                        form
                    }
                }))
            } else if (routeName === 'register') {
                const form = registerParser($, $response)
                dispatch(receiveRegisterHref(form.href))
                return dispatch(receiveLoginPageData({
                    registerSection: {
                        isFormLoaded: true,
                        form
                    }
                }))
            }
            return dispatch(receiveLoginPageData())
        })
}

const submitForm = (href, formValues, formSelector) => {
    return makeFormEncodedRequest(href, formValues, {method: 'POST'})
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            if (isFormResponseInvalid($response, formSelector)) {
                const error = {
                    _error: 'Username or password is incorrect'
                }
                throw new SubmissionError(error)
            }
            return '/customer/account'
        })
        .catch((error) => {
            if (error.name !== 'SubmissionError') {
                throw new SubmissionError({_error: 'Failed to login due to network error.'})
            }
            throw error
        })
}

export const login = (formValues) => (dispatch, getState) => {
    const currentState = getState()
    const href = getLoginHref(currentState)
    const formKey = getFormKey(currentState)
    return submitForm(href, {...formValues, form_key: formKey}, '.form-login')
}

export const registerUser = (formValues) => (dispatch, getState) => {
    const currentState = getState()
    const href = getRegisterHref(currentState)
    const formKey = getFormKey(currentState)
    return submitForm(href, {...formValues, form_key: formKey}, '.form-create-account')
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
