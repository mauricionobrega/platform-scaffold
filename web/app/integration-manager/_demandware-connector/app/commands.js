import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveNavigationData} from '../../responses'

import {API_END_POINT_URL, DW_CLIENT_ID, SITE_ID} from '../constants'

export const requestHeaders = {
    'Content-Type': 'application/json',
    'x-dw-client-id': DW_CLIENT_ID
}

export const initDemandWareSession = () => {
    const options = {
        method: 'POST',
        body: '{ type : "session" }',
        headers: requestHeaders
    }
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, options)
        .then((response) => {
            // To Do: Add this to the store???
            requestHeaders.Authorization = response.headers.get('Authorization')
            options.headers.Authorization = response.headers.get('Authorization')
            return makeRequest(`${API_END_POINT_URL}/sessions`, options)
        })
}

export const fetchNavigationData = () => (dispatch) => {
    const options = {
        method: 'GET',
        headers: requestHeaders
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
