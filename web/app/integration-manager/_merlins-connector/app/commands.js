/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {getCart} from '../cart/commands'
import {parseLoginStatus} from './parser'
import {parseNavigation} from '../navigation/parser'
import {receiveFormKey} from '../actions'
import {CHECKOUT_SHIPPING_URL, CART_URL} from '../constants'
import {generateFormKeyCookie} from '../../../utils/magento-utils'

import {
    receiveNavigationData,
    setPageFetchError,
    setCheckoutShippingURL,
    setCartURL,
    setLoggedIn
} from '../../results'

export const fetchPageData = (url) => (dispatch) => (
    makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            dispatch(setLoggedIn(parseLoginStatus($response)))
            dispatch(receiveNavigationData(parseNavigation($, $response)))
            return res
        })
        .catch((error) => {
            console.info(error.message)
            if (error.name !== 'FetchError') {
                throw error
            } else {
                dispatch(setPageFetchError(error.message))
            }
        })
)

export const initApp = () => (dispatch) => {
    const formKey = generateFormKeyCookie()
    dispatch(receiveFormKey(formKey))

    dispatch(setCheckoutShippingURL(CHECKOUT_SHIPPING_URL))
    dispatch(setCartURL(CART_URL))
    return dispatch(getCart())
}
