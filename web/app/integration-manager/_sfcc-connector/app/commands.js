/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as utils from '../utils'
import {receiveNavigationData, setLoggedIn, setCheckoutShippingURL, setCartURL} from '../../results'
import {receiveUserEmail} from '../../checkout/results'
import {getCart} from '../cart/commands'
import {parseCategories} from '../parsers'

import {API_END_POINT_URL, SIGN_IN_URL, CHECKOUT_SHIPPING_URL, CART_URL} from '../constants'

export const fetchNavigationData = () => (dispatch) => {
    return utils.makeSfccUnAuthenticatedRequest(`${API_END_POINT_URL}/categories/root?levels=2`, {method: 'GET'})
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
    return utils.initSfccAuthAndSession()
        .then(() => dispatch(fetchNavigationData()))
        .then(() => {
            const customerData = utils.getCustomerData(utils.getAuthToken())
            dispatch(setCheckoutShippingURL(CHECKOUT_SHIPPING_URL))
            dispatch(setCartURL(CART_URL))

            if (!customerData.guest) {
                dispatch(setLoggedIn(true))
                return utils.makeSfccRequest(`${API_END_POINT_URL}/customers/${customerData.customer_id}`, {method: 'GET'})
                    .then((response) => response.json())
                    .then(({email}) => {
                        return dispatch(receiveUserEmail(email))
                    })
            }

            return dispatch(setLoggedIn(false))
        })
        .then(() => dispatch(getCart()))
}
