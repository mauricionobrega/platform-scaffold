let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchPdpData = (...args) => connector.fetchPdpData(...args)

export const addToCart = (...args) => connector.addToCart(...args)

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)

export const submitShipping = (...args) => connector.submitShipping(...args)

export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)

export const submitSignIn = (...args) => connector.submitSignIn(...args)

export const fetchHomeData = (...args) => connector.fetchHomeData(...args)
