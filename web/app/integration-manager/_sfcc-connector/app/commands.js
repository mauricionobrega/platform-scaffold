/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as utils from '../utils'
import {receiveNavigationData, setLoggedIn, setCheckoutShippingURL, setCartURL} from '../../results'
import {receiveUserEmail} from '../../checkout/results'
import {getCart} from '../cart/commands'
import {parseCategories} from '../parsers'

import {API_END_POINT_URL, SIGN_IN_URL, CHECKOUT_SHIPPING_URL, CART_URL} from '../constants'
import {SIGNED_IN_NAV_ITEM_TYPE, GUEST_NAV_ITEM_TYPE} from '../../../containers/navigation/constants'

export const fetchNavigationData = () => (dispatch) => {
    return utils.makeSfccUnAuthenticatedRequest(`${API_END_POINT_URL}/categories/root?levels=2`, {method: 'GET'})
        .then((response) => response.json())
        .then(({categories}) => {
            const navData = parseCategories(categories)

            const accountNode = utils.isUserLoggedIn(utils.getAuthToken())
                ? {
                    title: 'Sign Out',
                    type: SIGNED_IN_NAV_ITEM_TYPE
                }
                : {
                    title: 'Sign In',
                    type: GUEST_NAV_ITEM_TYPE
                }

            // Long story. The nav system ignores the `path` property when the user is
            // logged in. Until we rework this, we always send the login path so the
            // reducer in the `containers/navigation/` area can just flip the account
            // node type and title and not worry about switching/adding/deleting the
            // `path` attribute.
            // See also `containers/navigation/container.jsx`'s `itemFactory()` function.
            accountNode.path = SIGN_IN_URL

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

            dispatch(setLoggedIn(false))
            return dispatch(getCart())
        })
}
