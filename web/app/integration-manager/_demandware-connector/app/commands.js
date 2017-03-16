import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveNavigationData} from '../../responses'
import {parseCategories} from '../parsers'

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
            const navData = parseCategories(categories)
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

const createNewBasket = () => {
    const options = {
        method: 'POST',
        headers: requestHeaders
    }
    return makeRequest(`${API_END_POINT_URL}/baskets`, options)
        .then((response) => response.json())
        .then((responseJSON) => {
            const basketID = responseJSON.basket_id
            if (basketID) {
                document.cookie = `mob-basket=${basketID}`
                return basketID
            }
            throw new Error('Unable to create new basket')
        })
}

export const getBasketID = () => {
    const basketMatch = /mob-basket=([^;]+);/.exec(document.cookie)
    if (basketMatch) {
        return new Promise((resolve) => {
            resolve(basketMatch[1])
        })
    }
    return createNewBasket()
}
