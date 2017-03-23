import * as utils from '../utils'
import {receiveNavigationData, receiveAppData} from '../../responses'
import {getCart} from '../cart/commands'
import {parseCategories} from '../parsers'

import {API_END_POINT_URL, SIGN_IN_URL} from '../constants'

export const fetchNavigationData = () => (dispatch) => {
    return utils.makeDemandwareUnAuthenticatedRequest(`${API_END_POINT_URL}/categories/root?levels=2`, {method: 'GET'})
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
                            path: SIGN_IN_URL,
                            type: 'AccountNavItem'
                        },
                        ...navData
                    ]
                }
            }))
        })
}

export const initApp = () => (dispatch) => {
    return utils.initDemandWareAuthAndSession()
        .then(() => dispatch(fetchNavigationData()))
        .then(() => dispatch(receiveAppData({isLoggedIn: utils.isUserLoggedIn(utils.getAuthToken())})))
        .then(() => dispatch(getCart()))
}
