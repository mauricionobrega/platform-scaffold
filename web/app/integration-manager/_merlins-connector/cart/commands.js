/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {removeNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {getIsLoggedIn} from '../../../store/user/selectors'
import {getUenc, getCustomerEntityID} from '../selectors'
import {receiveEntityID} from '../actions'
import {getSelectedShippingMethod, getShippingAddress} from '../../../store/checkout/shipping/selectors'
import {getCouponValue} from '../../../store/form/selectors'
import {receiveCartContents} from '../../cart/results'
import {receiveCartProductData} from '../../products/results'
import {submitForm, textFromFragment} from '../utils'
import {parseLocations} from '../checkout/parsers'
import {receiveCheckoutLocations} from '../../checkout/results'
import {fetchShippingMethodsEstimate} from '../checkout/commands'
import {fetchPageData} from '../app/commands'
import {parseCart, parseCartProducts, parseCartTotals} from './parser'
import {parseCheckoutEntityID, extractMagentoJson} from '../../../utils/magento-utils'
import {ADD_TO_WISHLIST_URL, PROMO_ERROR} from '../../../containers/cart/constants'
import {ESTIMATE_FORM_NAME} from '../../../store/form/constants'
import {getProductById} from '../../../store/products/selectors'

const LOAD_CART_SECTION_URL = '/customer/section/load/?sections=cart%2Cmessages&update_section_id=true'
const REMOVE_CART_ITEM_URL = '/checkout/sidebar/removeItem/'
const UPDATE_ITEM_URL = '/checkout/sidebar/updateItemQty/'
const BASE_HEADERS = {
    Accept: 'application/json',
}

/**
 * Get the contents of the users cart
 */
export const getCart = () => (dispatch) => {
    const opts = {
        headers: BASE_HEADERS
    }
    dispatch(removeNotification('cartUpdateError'))
    const currentTimeMs = new Date().getTime()
    return makeRequest(`${LOAD_CART_SECTION_URL}&_=${currentTimeMs}`, opts)
        .then((response) => response.json())
        .then(({cart}) => {
            cart.items.forEach((item) => {
                item.product_price = textFromFragment(item.product_price)
            })

            if (cart.items.length > 0) {
                dispatch(receiveCartProductData(parseCartProducts(cart)))
            }

            dispatch(receiveCartContents(parseCart(cart)))
        })
}

export const addToCart = (productId, quantity) => (dispatch, getState) => {
    const product = getProductById(productId)(getState())
    const formInfo = getState().integrationManager.get(urlToPathKey(product.get('href')))
    const formValues = {
        ...formInfo.get('hiddenInputs').toJS(),
        qty: quantity
    }

    return submitForm(
            formInfo.get('submitUrl'),
            formValues,
            {method: formInfo.get('method')}
        )
        .then(() => dispatch(getCart()))
}

/**
 * Remove an item from the users cart
 *
 * Notes:
 *
 * - The `item_id` present in the data returned from getCart.
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 * - Important: The cart contents rendered in the main HTML is *not* updated until `getCart()` has been called which
 *   busts a cache. removeFromCart() will call getCart() once the request to remove the item has completed
 */
export const removeFromCart = (itemId) => {
    return (dispatch) => {
        return submitForm(REMOVE_CART_ITEM_URL, {item_id: itemId}, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.success) {
                    return dispatch(getCart())
                }
                throw new Error('Unable to remove item')
            })
    }
}

/**
 * Update the quantity of an item in the users cart
 *
 * Notes:
 *
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 */
export const updateItemQuantity = (itemId, itemQuantity) => {
    return (dispatch) => {
        const requestData = {
            item_id: itemId,
            item_qty: itemQuantity
        }

        return submitForm(UPDATE_ITEM_URL, requestData, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.success) {
                    return dispatch(getCart())
                }
                throw new Error('Unable to update Quantity')
            })
    }
}

const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']

export const initCartPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => { // eslint-disable-line no-unused-vars
            const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)

            dispatch(receiveEntityID(parseCheckoutEntityID($response)))
            dispatch(receiveCheckoutLocations(parseLocations(magentoFieldData)))

            return dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
        })
}

export const addToWishlist = (productId, productURL) => (dispatch, getState) => {
    const currentState = getState()
    const payload = {
        product: productId,
        // This won't always be defined, but add to wishlist will still work
        // if it's missing
        uenc: getUenc(urlToPathKey(productURL))(currentState)
    }

    return submitForm(ADD_TO_WISHLIST_URL, payload, {method: 'POST'})
            .then(jqueryResponse)
            .then((response) => {
                const [$, $response] = response // eslint-disable-line no-unused-vars
                // The response is the HTML of the wishlist page, so check for the item we added
                if ($response.find(`.product-item-link[href="${productURL}"]`).length) {
                    return
                }
                throw new Error('Add Request Failed')
            })
}

export const fetchTaxEstimate = (address, shippingMethod) => (dispatch, getState) => {
    const currentState = getState()
    const isLoggedIn = getIsLoggedIn(currentState)
    const entityID = getCustomerEntityID(currentState)

    const getTotalsURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/totals-information`
    const shippingMethodParts = shippingMethod.split('_')

    const requestData = {
        addressInformation: {
            address,
            shipping_carrier_code: shippingMethodParts[0],
            shipping_method_code: shippingMethodParts[1]
        }
    }

    return makeJsonEncodedRequest(getTotalsURL, requestData, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            dispatch(receiveCartContents(
                parseCartTotals(responseJSON)
            ))
        })
}

export const getCartTotalsInfo = (currentState) => {
    const address = getShippingAddress(currentState).toJS()
    let shippingMethod = getSelectedShippingMethod(currentState).toJS().value || ''
    shippingMethod = shippingMethod.length ? shippingMethod.split('_') : []
    const requestData = {
        addressInformation: {
            address: {
                country_id: address.countryId || address.country_id,
                region_id: address.regionId || address.region_id,
                postcode: address.postcode
            },
            shipping_carrier_code: shippingMethod[0],
            shipping_method_code: shippingMethod[1]
        }
    }

    const isLoggedIn = getIsLoggedIn(currentState)
    const entityID = getCustomerEntityID(currentState)
    const getTotalsURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/totals-information`
    return makeJsonEncodedRequest(getTotalsURL, requestData, {method: 'POST'})
        .then((response) => response.json())
        // the above request will be handled by other actions below!
}

export const putPromoCode = (couponCode) => (dispatch, getState) => {
    const currentState = getState()
    const isLoggedIn = getIsLoggedIn(currentState)
    const entityID = getCustomerEntityID(currentState)
    couponCode = getCouponValue(currentState)

    const putPromoUrl = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/coupons/${couponCode}`
    return makeJsonEncodedRequest(putPromoUrl, couponCode, {method: 'PUT'})
        .then((response) => {
            // Check if coupon is valid
            if (response.status === 404) {
                throw Error(`${PROMO_ERROR}, code is invalid`)
            }
        })
        .then(() => getCartTotalsInfo(currentState))
        .then((responseJSON) => {
            dispatch(receiveCartContents(parseCartTotals(responseJSON)))
        })
}

export const deletePromoCode = (couponCode) => (dispatch, getState) => {
    const currentState = getState()
    const isLoggedIn = getIsLoggedIn(currentState)
    const entityID = getCustomerEntityID(currentState)
    couponCode = getCouponValue(currentState)

    const deletePromoUrl = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/coupons/`
    return makeJsonEncodedRequest(deletePromoUrl, couponCode, {method: 'DELETE'})
        .then((response) => response.json())
        .then(() => getCartTotalsInfo(currentState))
        .then((responseJSON) => {
            dispatch(receiveCartContents(parseCartTotals(responseJSON)))
        })
}
