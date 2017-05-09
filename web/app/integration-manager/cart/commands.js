let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initCartPage = (url, routeName) => connector.initCartPage(url, routeName)

/**
 * Retrieves the current cart information.
 */
export const getCart = () => connector.getCart()
export const addToCart = (productID, quantity) => connector.addToCart(productID, quantity)
export const removeFromCart = (itemId) => connector.removeFromCart(itemId)

export const updateItemQuantity = (itemId, itemQuantity) => connector.updateItemQuantity(itemId, itemQuantity)

export const addToWishlist = (productID, productURL) => connector.addToWishlist(productID, productURL)

export const fetchTaxEstimate = (...args) => connector.fetchTaxEstimate(...args)
