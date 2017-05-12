/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as utils from '../utils'
import {receiveNavigationData, setLoggedIn, setCheckoutShippingURL, setCartURL} from '../../results'
import {getCart} from '../cart/commands'
import {parseCategories} from '../parsers'

import {API_END_POINT_URL, SIGN_IN_URL, SIGN_OUT_URL, CHECKOUT_SHIPPING_URL, CART_URL} from '../constants'

export const fetchNavigationData = () => (dispatch) => {
    return utils.makeSfccUnAuthenticatedRequest(`${API_END_POINT_URL}/categories/root?levels=2`, {method: 'GET'})
        .then((response) => response.json())
        .then(({categories}) => {
            const navData = parseCategories(categories)

            const accountNode = utils.isUserLoggedIn(utils.getAuthToken())
                ? {
                    path: SIGN_OUT_URL,
                    type: 'AccountLogoutNavItem'
                }
                : {
                    path: SIGN_IN_URL,
                    type: 'AccountNavItem'
                }

            return dispatch(receiveNavigationData({
                path: '/',
                root: {
                    title: 'root',
                    path: '/',
                    children: [
                        accountNode,
                        ...navData
                    ]
                }
            }))
        })
}

export const initApp = () => (dispatch) => {
    return utils.initSfccAuthAndSession()
        .then(() => dispatch(fetchNavigationData()))
        .then(() => {
            dispatch(setCheckoutShippingURL(CHECKOUT_SHIPPING_URL))
            dispatch(setCartURL(CART_URL))
            dispatch(setLoggedIn(utils.isUserLoggedIn(utils.getAuthToken())))
        })
        .then(() => dispatch(getCart()))
}
