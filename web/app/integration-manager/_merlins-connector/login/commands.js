import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {SubmissionError} from 'redux-form'

import {receiveLoginHref, receiveRegisterHref} from '../actions'
import {getLoginHref, getFormKey, getRegisterHref} from '../selectors'
import {fetchPageData} from '../app/commands'
import {getCart} from '../cart/commands'
import {setSigninLoaded, setRegisterLoaded} from '../../login/results'
import {receiveNavigationData} from '../../results'
import {parseNavigation} from '../navigation/parser'

import {isFormResponseInvalid, parseSigninHref, parseRegisterHref} from './parsers/parsers'

export const initLoginPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            dispatch(receiveLoginHref(parseSigninHref(res[1])))
            dispatch(setSigninLoaded())
        })
}

export const initRegisterPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            dispatch(receiveRegisterHref(parseRegisterHref(res[1])))
            dispatch(setRegisterLoaded())
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
 * Uses React router to ensure browser history remains consistent with the
 * selected section.
 */
export const navigatedToSection = (router, routes, sectionName) => {
    return () => {
        router.push(findPathForRoute(routes, sectionName))
    }
}

export const logout = () => (dispatch) => (
    makeRequest('/customer/account/logout/')
        // Don't wait for the cart to do everything else
        .then(() => { dispatch(getCart()) })
        // Update navigation menu
        // Need to request current location so that the right entry is active
        .then(() => makeRequest(window.location.href))
        .then(jqueryResponse)
        .then(([$, $response]) => dispatch(receiveNavigationData(parseNavigation($, $response))))
)
