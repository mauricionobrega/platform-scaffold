import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveNavigationData} from '../../responses'
import {getCart} from '../cart/commands'

import {API_END_POINT_URL, SITE_ID, REQUEST_HEADERS} from '../constants'


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
        })
        .then(() => {
            // Once the session has been opened return the authorization headers to the request
            return {
                ...REQUEST_HEADERS,
                Authorization: authorization
            }
        })
}

export const fetchNavigationData = (headers) => (dispatch) => {
    const options = {
        method: 'GET',
        headers
    }
    return makeRequest(`${API_END_POINT_URL}/categories/root?levels=2`, options)
        .then((response) => response.json())
        .then(({categories}) => {
            const navData = categories.map((category) => {
                return {
                    title: category.name,
                    path: `/s/${SITE_ID}/${category.id}`,
                    isCategoryLink: true
                }
            })
            return dispatch(receiveNavigationData({
                path: '/',
                root: {
                    title: 'root',
                    path: '/',
                    children: [
                        {
                            // TODO: Find a way to get this data without hardcoding
                            title: 'Sign In',
                            path: `/on/demandware.store/${SITE_ID}/default/Account-Show`,
                            type: 'AccountNavItem'
                        },
                        ...navData
                    ]
                }
            }))
        })
}

export const initApp = () => (dispatch) => {
    let headers
    return initDemandWareSession()
        .then((requestHeaders) => {
            headers = requestHeaders
            return dispatch(fetchNavigationData(headers))
        })
        .then(() => dispatch(getCart(headers)))
}
