import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {getCart} from '../cart/commands'
import {appParser} from './parser'
import {parseNavigation} from '../navigation/parser'
import {receiveFormKey} from '../actions'
import {CHECKOUT_SHIPPING_URL, CART_URL} from '../constants'
import {generateFormKeyCookie} from '../../../utils/magento-utils'

import {
    receiveNavigationData,
    receiveAppData,
    setPageFetchError,
    setCheckoutShippingURL,
    setCartURL
} from '../../results'

export const fetchPageData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            const appData = appParser($response)
            dispatch(receiveAppData({...appData}))
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
}

export const initApp = () => (dispatch) => {
    const formKey = generateFormKeyCookie()
    dispatch(receiveFormKey(formKey))

    dispatch(setCheckoutShippingURL(CHECKOUT_SHIPPING_URL))
    dispatch(setCartURL(CART_URL))
    return dispatch(getCart())
}
