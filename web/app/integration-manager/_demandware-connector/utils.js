import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {API_END_POINT_URL, REQUEST_HEADERS} from './constants'

export const initDemandWareSession = () => {
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
            return makeRequest(`${API_END_POINT_URL}/sessions`, options)
                .then(() => {
                    // Once the session has been opened return the authorization headers to the next request
                    return {
                        ...REQUEST_HEADERS,
                        Authorization: authorization
                    }
                })
        })
}

export const makeDemandwareRequest = (url, options) => {
    return initDemandWareSession()
        .then((headers) => {
            const requestOptions = {
                ...options,
                headers
            }
            return makeRequest(url, requestOptions)
        })
}
