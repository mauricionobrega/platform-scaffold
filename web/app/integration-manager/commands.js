import * as connector from './connector'

export const fetchPdpData = (...args) => {
    return connector.fetchPdpData(...args)
}

export const addToCart = (...args) => {
    return connector.addToCart(...args)
}
