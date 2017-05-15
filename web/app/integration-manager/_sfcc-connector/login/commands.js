/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SubmissionError} from 'redux-form'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {setRegisterLoaded, setSigninLoaded} from '../../login/results'
import {setLoggedIn} from '../../results'
import {initSfccSession, deleteAuthToken, storeAuthToken, makeSfccRequest, deleteBasketID, storeBasketID} from '../utils'
import {requestCartData, createBasket, handleCartData} from '../cart/utils'
import {fetchNavigationData} from '../app/commands'

import {API_END_POINT_URL, REQUEST_HEADERS} from '../constants'

const initLoginData = () => (dispatch) => {
    dispatch(setSigninLoaded())
    dispatch(setRegisterLoaded())
    return Promise.resolve()
}

export const initLoginPage = initLoginData
export const initRegisterPage = initLoginData

export const navigatedToSection = () => (dispatch) => Promise.resolve()

export const login = (username, password) => (dispatch) => {
    const authorizationData = window.btoa(`${username}:${password}`)
    const requestOptions = {
        method: 'POST',
        body: '{type: "credentials"}',
        headers: {
            ...REQUEST_HEADERS,
            Authorization: `Basic ${authorizationData}`
        }
    }
    let responseHeaders
    let basketContents
    let customerID
    return requestCartData()
        .then((response) => response.json())
        .then((basket) => {
            basketContents = basket

            // Actual login call
            return makeRequest(`${API_END_POINT_URL}/customers/auth`, requestOptions)
        })
        .then((response) => {
            responseHeaders = response.headers
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.fault) {
                let errorMessage = 'Username or password is incorrect'
                if (/internal server/i.test(responseJSON.fault.message)) {
                    errorMessage = 'There was a problem logging in. Please try again.'
                }
                throw new SubmissionError({_error: errorMessage})
            }
            const authorization = responseHeaders.get('Authorization')
            customerID = responseJSON.customer_id
            storeAuthToken(authorization)
            dispatch(setLoggedIn(true))
            deleteBasketID()
            return initSfccSession(authorization)
        })
        // Check if the user has a basket already
        .then(() => makeSfccRequest(`${API_END_POINT_URL}/customers/${customerID}/baskets`), {method: 'GET'})
        .then((response) => response.json())
        .then(({baskets}) => {
            if (baskets.length) {
                const basketID = baskets[0].basket_id
                storeBasketID(basketID)
                if (!basketContents.product_items) {
                    // There is no basket to merge, so return the existing one
                    return Promise.resolve(baskets[0])
                }
                // update basket with contents (product_items)
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify(basketContents.product_items)
                }
                return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, requestOptions)
                    .then((response) => response.json())
            }
            return createBasket(basketContents)
        })
        .then((responseJSON) => dispatch(handleCartData(responseJSON)))
        .then(() => {
            // Navigate to the homepage, since we haven't made an account page yet
            // and demandware's account page is at the same URL as their login page
            return '/on/demandware.store/Sites-2017refresh-Site/default/Home-Show'
        })
}

export const logout = () => (dispatch) => {
    const requestOptions = {
        method: 'DELETE',
    }

    return makeSfccRequest(`${API_END_POINT_URL}/customers/auth`, requestOptions)
        .then((response) => {
            // We don't really do any serious error checking here because we can't
            // really do much about it.
            if (response.fault) {
                console.error('Error logging out. Clearing auth tokens anyways.', response.json())
            }

            deleteBasketID()
            deleteAuthToken()
            dispatch(setLoggedIn(false))

            // This isn't great, but it's the only _simple_ way to refresh the
            // navigation menu to show the Account status correctly.
            return dispatch(fetchNavigationData())
        })
}

export const registerUser = ({firstname, lastname, email, password}) => (dispatch) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            password,
            customer: {
                first_name: firstname,
                last_name: lastname,
                login: email,
                email
            }
        })
    }
    return makeSfccRequest(`${API_END_POINT_URL}/customers`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new SubmissionError({_error: 'Unable to create account.'})
            }

            // Creating a user doesn't sign them in automatically, so dispatch the login command
            return dispatch(login(email, password, true))
        })

}
