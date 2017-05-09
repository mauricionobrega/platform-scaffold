let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initCartPage = (url, routeName) => connector.initCartPage(url, routeName)

/**
 * Retrieves the current cart information.
 */
export const getCart = () => connector.getCart()
export const addToCart = (...args) => connector.addToCart(...args)
export const removeFromCart = (...args) => connector.removeFromCart(...args)

export const updateItemQuantity = (...args) => connector.updateItemQuantity(...args)

export const addToWishlist = (...args) => connector.addToWishlist(...args)

export const fetchTaxEstimate = (...args) => connector.fetchTaxEstimate(...args)
