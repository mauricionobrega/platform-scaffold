let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Retrieves the current cart information.
 */
export const getCart = () => connector.getCart()

export const initCartPage = (...args) => connector.initCartPage(...args)

export const removeFromCart = (...args) => connector.removeFromCart(...args)

export const updateItemQuantity = (...args) => connector.updateItemQuantity(...args)

export const addToWishlist = (...args) => connector.addToWishlist(...args)

export const addToCart = (...args) => connector.addToCart(...args)

export const fetchTaxEstimate = (...args) => connector.fetchTaxEstimate(...args)
