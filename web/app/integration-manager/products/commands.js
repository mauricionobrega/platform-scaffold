let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initProductDetailsPage = (url, routeName) => connector.initProductDetailsPage(url, routeName)

export const getProductVariantData = (variationSelections, variants, categoryIds) => connector.getProductVariantData(variationSelections, variants, categoryIds)
