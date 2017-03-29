import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {API_END_POINT_URL, REQUEST_HEADERS} from './constants'

const getAuthTokenPayload = (authToken) => {
    // The token consists of 3 parts: header, payload and signature
    // separated by a '.', each part is encoded
    // we only need the payload
    return JSON.parse(window.atob(authToken.split('.')[1]))
}

export const isUserLoggedIn = (authorization) => {
    const {sub} = getAuthTokenPayload(authorization)
    const subData = JSON.parse(sub)
    return !subData.customer_info.guest
}

export const storeAuthToken = (authorization) => {
    window.sessionStorage.setItem('mob-auth', authorization)
}

export const getAuthToken = () => {
    return window.sessionStorage.getItem('mob-auth')
}

export const deleteBasketID = () => {
    window.sessionStorage.removeItem('mob-basket')
}

export const getBasketID = () => {
    return window.sessionStorage.getItem('mob-basket')
}

export const storeBasketID = (basketID) => {
    window.sessionStorage.setItem('mob-basket', basketID)
}

export const initDemandwareSession = (authorization) => {
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

export const initDemandWareAuthAndSession = () => {
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
        body: '{ type : "session" }',
        headers: REQUEST_HEADERS
    }
    let authorization
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, options)
        .then((response) => {
            authorization = response.headers.get('Authorization')
            storeAuthToken(authorization)
            return initDemandwareSession(authorization)
        })
}

export const makeDemandwareRequest = (url, options) => {
    return initDemandWareAuthAndSession()
        .then((headers) => {
            const requestOptions = {
                ...options,
                headers
            }
            return makeRequest(url, requestOptions)
        })
}

export const makeDemandwareUnAuthenticatedRequest = (url, options) => {
    const requestOptions = {
        ...options,
        headers: REQUEST_HEADERS
    }
    return makeRequest(url, requestOptions)
}
