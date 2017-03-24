let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)
export const submitShipping = (...args) => connector.submitShipping(...args)
export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)
export const checkoutSignIn = (...args) => connector.checkoutSignIn(...args)
