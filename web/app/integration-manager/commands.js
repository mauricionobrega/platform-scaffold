import * as connector from './demandware-connector/connector'

export const fetchPdpData = (...args) => {
    return connector.fetchPdpData(...args)
}

export const addToCart = (...args) => {
    return connector.addToCart(...args)
}

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)

export const submitShipping = (...args) => connector.submitShipping(...args)

export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)

export const submitSignIn = (...args) => connector.submitSignIn(...args)
