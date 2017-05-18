/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {API_END_POINT_URL, REQUEST_HEADERS} from './constants'

const AUTH_KEY_NAME = 'mob-auth'
const BASKET_KEY_NAME = 'mob-basket'

export const storeAuthToken = (authorization) => {
    if (authorization) {
        window.sessionStorage.setItem(AUTH_KEY_NAME, authorization)
    }
}

export const getAuthToken = () => {
    return window.sessionStorage.getItem(AUTH_KEY_NAME)
}

export const deleteAuthToken = () => {
    window.sessionStorage.removeItem(AUTH_KEY_NAME)
}

export const deleteBasketID = () => {
    window.sessionStorage.removeItem(BASKET_KEY_NAME)
}

export const getBasketID = () => {
    return window.sessionStorage.getItem(BASKET_KEY_NAME)
}

export const storeBasketID = (basketID) => {
    if (basketID === undefined) {
        throw new Error('Storing basketID that is undefined!!')
    }

    window.sessionStorage.setItem(BASKET_KEY_NAME, basketID)
}

export const getAuthTokenPayload = (authToken) => {
    if (!authToken) {
        authToken = getAuthToken().replace('Bearer ', '')
    }
    // The token consists of 3 parts: header, payload and signature
    // separated by a '.', each part is encoded
    // we only need the payload
    return JSON.parse(window.atob(authToken.split('.')[1]))
}

export const isUserLoggedIn = (authorization) => {
    try {
        const {sub} = getAuthTokenPayload(authorization)
        const subData = JSON.parse(sub)
        return !subData.customer_info.guest
    } catch (e) {
        console.log('Error checking if user is logged in. Assuming `false`', e)
        return false
    }
}

export const initSfccSession = (authorization) => {
    const options = {
        method: 'POST',
        body: '{ type : "session" }',
        headers: {
            ...REQUEST_HEADERS,
            Authorization: authorization
        }
    }
    return makeRequest(`${API_END_POINT_URL}/sessions`, options)
        .then(() => {
            // Once the session has been opened return the authorization headers to the next request
            return options.headers
        })
}

export const initSfccAuthAndSession = () => {
    const authorizationToken = getAuthToken()
    if (authorizationToken) {
        const {exp} = getAuthTokenPayload(authorizationToken.replace('Bearer ', ''))
        // Get current Unix time in seconds (not milliseconds)
        const currentTime = Math.floor(Date.now() / 1000)
        if (currentTime <= exp) {
            // The token is still valid
            return Promise.resolve({
                ...REQUEST_HEADERS,
                Authorization: authorizationToken
            })
        }
        // The token has expired, refresh it
        const requestOptions = {
            method: 'POST',
            body: '{ type : "refresh" }',
            headers: {
                ...REQUEST_HEADERS,
                Authorization: authorizationToken
            }
        }
        return makeRequest(`${API_END_POINT_URL}/customers/auth`, requestOptions)
            .then((response) => {
                if (response.status === 401) {
                    // The server did not accept the token, start from scratch
                    deleteAuthToken()
                    return initSfccAuthAndSession()
                }

                const authorizationToken = response.headers.get('Authorization')
                storeAuthToken(authorizationToken)
                return {
                    ...REQUEST_HEADERS,
                    Authorization: authorizationToken
                }
            })
    }
    const options = {
        method: 'POST',
        body: '{ type : "guest" }',
        headers: REQUEST_HEADERS
    }
    let authorization
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, options)
        .then((response) => {
            authorization = response.headers.get('Authorization')
            storeAuthToken(authorization)
            return initSfccSession(authorization)
        })
}

export const makeApiRequest = (path, options) => {
    return initSfccAuthAndSession()
        .then((headers) => {
            const requestOptions = {
                ...options,
                headers
            }
            return makeRequest(API_END_POINT_URL + path, requestOptions)
        })
}

export const makeApiJsonRequest = (path, body, options) => {
    return makeApiRequest(path, {
        ...options,
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new Error(responseJSON.fault.message)
            }
            return responseJSON
        })
}

export const makeSfccUnAuthenticatedRequest = (url, options) => {
    const requestOptions = {
        ...options,
        headers: REQUEST_HEADERS
    }
    return makeRequest(url, requestOptions)
}

export const formatPrice = (price) => {
    if (!price) {
        price = 0
    }
    return `$${price.toFixed(2)}`
}
