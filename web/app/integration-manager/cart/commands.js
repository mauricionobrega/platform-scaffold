/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Cart page
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initCartPage = (url, routeName) => connector.initCartPage(url, routeName)

/**
 * Retrieves the current cart information.
 */
export const getCart = () => connector.getCart()

/**
 * Adds a product to the cart
 * @param productId {string} The product's ID
 * @param quantity {number} The quantity to add
 */
export const addToCart = (productId, quantity) => connector.addToCart(productId, quantity)

/**
 * Removes an item from the cart
 * @param itemID {string} The cart item ID to remove
 */
export const removeFromCart = (itemID) => connector.removeFromCart(itemID)

/**
 * Updates the quantity of the given item in the cart
 * @param itemID {string} The cart item ID to update
 * @param quantity {number} The new quantity
 */
export const updateItemQuantity = (itemID, quantity) => connector.updateItemQuantity(itemID, quantity)

/**
 * Add a product to the wishlist
 * @param productId {string} The product's ID
 * @param productURL {strin} The URL of the product's detail page
 */
export const addToWishlist = (productId, productURL) => connector.addToWishlist(productId, productURL)

/**
 * Estimates taxes for a proposed address and shipping method
 * @param address {object} The address to use for tax estimation
 * @param shippingMethod {string} The shipping method to use for tax estimation (connector-specific!)
 */
export const fetchTaxEstimate = (address, shippingMethod) => connector.fetchTaxEstimate(address, shippingMethod)
