let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchPdpData = (...args) => connector.fetchPdpData(...args)

export const getProductVariationData = (...args) => connector.getProductVariationData(...args)
