/**
 * Demonstrates fetching/modifying the cart contents on the Merlin's site. This isn't
 * tested - just the result of inspecting the requests/responses to the site and then
 * translating them to JS.
 *
 * All requests require a session, eg. 'Cookie: PHPSESSID=as337c3fq7751n9gn1o3enacf7'
 */
import parse from './parsers/parser'
import * as utils from '../../utils/utils'

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
    return utils.makeRequest('/customer/section/load/?sections=cart', opts)
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
    const body = new FormData()
    body.append('item_id', itemId)

    const headers = Object.assign({}, baseHeaders, {
        'Content-Type': 'application/x-www-form-urlencoded',
    })

    const opts = {headers, body, method: 'POST'}
    return fetch('/checkout/sidebar/removeItem/', opts)
        .json()
}

/**
 * Update the quantity of an item in the users cart
 *
 * Notes:
 *
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 * - Important: The cart contents rendered in the main HTML is *not* updated until `getCart()` has been called which
 *   busts a cache. You are expected to call `removeFromCart()` then `getCart()` every time.
 */
export const updateItemQuantity = (itemId, itemQuantity) => {
    const body = new FormData()
    body.append('item_id', itemId)
    body.append('item_qty', itemQuantity)

    const headers = Object.assign({}, baseHeaders, {
        'Content-Type': 'application/x-www-form-urlencoded',
    })

    const opts = {headers, body, method: 'POST'}
    return fetch('/checkout/sidebar/updateItemQty/', opts)
        .json()
}
