/**
 * Demonstrates fetching/modifying the cart contents on the Merlin's site. This isn't
 * tested - just the result of inspecting the requests/responses to the site and then
 * translating them to JS.
 *
 * All requests require a session, eg. 'Cookie: PHPSESSID=as337c3fq7751n9gn1o3enacf7'
 */
import parse from './parsers/parser'
import * as utils from '../../utils/utils'

import {makeFormEncodedRequest, makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {addNotification, removeNotification} from '../../containers/app/actions'

const LOAD_CART_SECTION_URL = '/customer/section/load/?sections=cart'
const REMOVE_CART_ITEM_URL = '/checkout/sidebar/removeItem/'
const UPDATE_ITEM_URL = '/checkout/sidebar/updateItemQty/'
const baseHeaders = {
    Accept: 'application/json',
}

export const receiveCartContents = utils.createAction('Received Cart Contents')

/**
 * Get the contents of the users cart
 */
export const getCart = () => (dispatch) => {
    const opts = {
        headers: baseHeaders
    }
    dispatch(removeNotification('cartUpdateError'))
    return utils.makeRequest(LOAD_CART_SECTION_URL, opts)
        .then((response) => response.text())
        .then((responseText) => dispatch(receiveCartContents(parse(responseText))))
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
 *   busts a cache. You are expected to call `removeFromCart()` then `getCart()` every time.
 */
export const removeFromCart = (itemId) => {
    return (dispatch) => {
        return makeFormEncodedRequest(REMOVE_CART_ITEM_URL, {item_id: itemId}, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.success) {
                    dispatch(getCart())
                } else {
                    dispatch(addNotification({
                        content: `Unable to remove item`,
                        id: 'cartUpdateError',
                        showRemoveButton: true
                    }))
                }
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
        const body = `item_id=${itemId}&item_qty=${itemQuantity}`
        const headers = {
            ...baseHeaders,
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        const opts = {headers, body, method: 'POST'}
        return makeRequest(UPDATE_ITEM_URL, opts)
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.success) {
                    dispatch(getCart())
                } else {
                    dispatch(addNotification({
                        content: `Unable to update Quantity`,
                        id: 'cartUpdateError',
                        showRemoveButton: true
                    }))
                }
            })
    }
}
