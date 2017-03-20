import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveNavigationData} from '../../responses'
import {getCart} from '../cart/commands'
import {parseCategories} from '../parsers'
import {initDemandWareSession} from '../utils'

import {API_END_POINT_URL, SITE_ID} from '../constants'


export const fetchNavigationData = (headers) => (dispatch) => {
    const options = {
        method: 'GET',
        headers
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

export const initApp = () => (dispatch) => {
    let headers
    return initDemandWareSession()
        .then((requestHeaders) => {
            headers = requestHeaders
            return dispatch(fetchNavigationData(headers))
        })
        .then(() => dispatch(getCart(headers)))
}
