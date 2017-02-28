import * as connector from './merlins-connector/connector'

export const fetchPdpData = (...args) => {
    return connector.fetchPdpData(...args)
}

export const addToCart = (...args) => {
    return connector.addToCart(...args)
}

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)
