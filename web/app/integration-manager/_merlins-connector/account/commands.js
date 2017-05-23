/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {SubmissionError} from 'redux-form'

import {getFormKey} from '../selectors'
import {fetchPageData} from '../app/commands'
import {getCart} from '../cart/commands'
import {setSigninLoaded, setRegisterLoaded} from '../../account/results'
import {buildFormData, createAddressRequestObject} from './utils'
import {getCookieValue} from '../../../utils/utils'
import {LOGIN_POST_URL, CREATE_ACCOUNT_POST_URL} from '../constants'

import {isFormResponseInvalid} from './parsers/parsers'

export const initLoginPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(() => {
            dispatch(setSigninLoaded())
        })
}

export const initRegisterPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(() => {
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

export const login = (username, password, rememberMe) => (dispatch, getState) => {
    const currentState = getState()
    const formKey = getFormKey(currentState)

    const formData = {
        'login[username]': username,
        'login[password]': password,
        form_key: formKey,
        send: ''
    }

    if (rememberMe) {
        formData.persistent_remember_me = 'on'
    }

    return submitForm(LOGIN_POST_URL, formData, '.form-login')
}

export const registerUser = (firstname, lastname, email, password, confirmPassword, rememberMe) => (dispatch, getState) => {
    const currentState = getState()
    const formKey = getFormKey(currentState)

    const formData = {
        firstname,
        lastname,
        email,
        password,
        password_confirmation: confirmPassword,
        form_key: formKey
    }
    if (rememberMe) {
        formData.persistent_remember_me = 'on'
    }
    return submitForm(CREATE_ACCOUNT_POST_URL, formData, '.form-create-account')
}

const findPathForRoute = (routes, routeName) => {
    const path = routes[0].childRoutes.find((route) => route.routeName === routeName).path
    return `/${path}`
}

/**
 * Uses React router to ensure browser history remains consistent with the
 * selected section.
 */
export const navigateToSection = (router, routes, sectionName) => {
    return () => {
        router.push(findPathForRoute(routes, sectionName))
    }
}

export const logout = () => (dispatch) => (
    makeRequest('/customer/account/logout/')
        // Don't wait for the cart to do everything else
        .then(() => { dispatch(getCart()) })
        // Update navigation menu and logged in flag
        // Need to request current location so that the right entry is active
        .then(() => fetchPageData(window.location.href))
)

export const updateShippingAddress = (shippingData) => (dispatch) => {
    const formData = buildFormData({
        form_key: getCookieValue('form_key'),
        success_url: '',
        error_url: '',
        ...createAddressRequestObject(shippingData),
        default_billing: 1,
        default_shipping: 1,
    })

    const postUpdateCustomerAddressURL = '/customer/address/formPost/'

    return new Promise((resolve) => {
        // We need to use jQuery.ajax here because currently fetch sends requests with all headers set to lowercase
        // using fetch here means the server won't handle our request properly
        // so instead we're using jQuery ajax since it sends requests matching what the server expects.
        // see http://stackoverflow.com/questions/34656412/fetch-sends-lower-case-header-keys
        window.Progressive.$.ajax({
            url: postUpdateCustomerAddressURL,
            data: formData,
            method: 'POST',
            processData: false,
            contentType: false,
            success: () => {
                return resolve()
            },
            error: (response) => {
                console.error('Updating the user Shipping and Billing address failed. Response log:')
                console.error(response)
                throw new Error('Unable to save Shipping and Billing Address')
            }
        })
    })
}

export const updateBillingAddress = (paymentData) => (dispatch) => {
    const formData = buildFormData({
        form_key: getCookieValue('form_key'),
        success_url: '',
        error_url: '',
        ...createAddressRequestObject(paymentData),
        default_billing: 1,
        default_shipping: 1,
    })

    const postUpdateCustomerAddressURL = '/customer/address/formPost/id/46/'
    return new Promise((resolve) => {
        // We need to use jQuery.ajax here because currently fetch sends requests with all headers set to lowercase
        // using fetch here means the server won't handle our request properly
        // so instead we're using jQuery ajax since it sends requests matching what the server expects.
        // see http://stackoverflow.com/questions/34656412/fetch-sends-lower-case-header-keys
        window.Progressive.$.ajax({
            url: postUpdateCustomerAddressURL,
            data: formData,
            method: 'POST',
            processData: false,
            contentType: false,
            success: () => resolve(),
            error: (response) => {
                console.error('Updating the user Shipping/Billing address failed. Response log:')
                console.error(response)
                throw new Error('Unable to save Billing Address')
            }
        })
    })

}
