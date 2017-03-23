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
    document.cookie = `mob-auth=${authorization}`
}

export const getAuthToken = () => {
    const authorizationMatch = /mob-auth=([^;]+);/.exec(document.cookie)
    return authorizationMatch ? authorizationMatch[1] : undefined
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
            return {
                ...REQUEST_HEADERS,
                Authorization: authorization
            }
        })
}

export const initDemandWareAuthAndSession = () => {
    const authorizationMatch = /mob-session-auth=([^;]+);/.exec(document.cookie)
    if (authorizationMatch) {
        return new Promise((resolve) => {
            resolve({
                ...REQUEST_HEADERS,
                Authorization: authorizationMatch[1]
            })
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
            options.headers.Authorization = authorization
            document.cookie = `mob-session-auth=${authorization}`
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
