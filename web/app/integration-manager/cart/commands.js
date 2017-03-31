let connector = {}

export const register = (commands) => {
    connector = commands
}

export const getCart = (...args) => connector.getCart(...args)

export const fetchCartPageData = (...args) => connector.fetchCartPageData(...args)

export const removeFromCart = (...args) => connector.removeFromCart(...args)

export const updateItemQuantity = (...args) => connector.updateItemQuantity(...args)
