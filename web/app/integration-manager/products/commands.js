let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initProductDetailsPage = (...args) => connector.initProductDetailsPage(...args)

export const getProductVariantData = (...args) => connector.getProductVariantData(...args)
