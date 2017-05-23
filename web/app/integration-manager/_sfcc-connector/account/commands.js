/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {setRegisterLoaded, setSigninLoaded} from '../../account/results'
import {setLoggedIn} from '../../results'
import {initSfccSession, storeAuthToken, makeSfccRequest, deleteBasketID, storeBasketID, getAuthTokenPayload} from '../utils'
import {requestCartData, createBasket, handleCartData} from '../cart/utils'
import {createOrderAddressObject} from '../checkout/utils'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'

import {API_END_POINT_URL, REQUEST_HEADERS} from '../constants'

const fetchLoginData = () => (dispatch) => {
    dispatch(setSigninLoaded())
    dispatch(setRegisterLoaded())
    return Promise.resolve()
}

export const fetchSigninData = fetchLoginData
export const fetchRegisterData = fetchLoginData

export const navigateToSection = () => (dispatch) => noop()

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
            if (baskets && baskets.length) {
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

export const registerUser = (firstname, lastname, email, password) => (dispatch) => {
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
    let responseHeaders
    return makeSfccRequest(`${API_END_POINT_URL}/customers`, requestOptions)
        .then((response) => {
            responseHeaders = response.headers
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new SubmissionError({_error: 'Unable to create account.'})
            }
            const authorization = responseHeaders.get('Authorization')
            if (authorization) {
                storeAuthToken(authorization)
                return initSfccSession(authorization)
            }
            return Promise.resolve()
        })
        // Creating a user doesn't sign them in automatically, so dispatch the login command
        .then(() => dispatch(login(email, password)))

}

const addAddress = (formValues, addressName) => {
    const addressData = createOrderAddressObject(formValues)
    const {sub} = getAuthTokenPayload()
    const customerId = JSON.parse(sub).customer_info.customer_id
    const requestData = {
        method: 'POST',
        body: JSON.stringify({
            ...addressData,
            address_id: addressName
        })
    }
    return makeSfccRequest(`${API_END_POINT_URL}/customers/${customerId}/addresses`, requestData)
        .then((response) => {
            if (response.status === 200) {
                return response.json
            }
            throw Error('Unable to save address')
        })
}


// updateShippingAddress and updateBillingAddress are separate commands to
// support other connectors that require different actions for saving a
// shipping vs. a billing address
// SFCC doesn't diferentiate between the two address types,
// so these commands do effectively the same thing
export const updateShippingAddress = (formValues) => (dispatch) => {
    return addAddress(formValues, 'shipping_address')
}

export const updateBillingAddress = (formValues) => (dispatch) => {
    return addAddress(formValues, 'billing_address')
}
