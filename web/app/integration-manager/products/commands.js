let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Product Details page
 */
export const initProductDetailsPage = (url, routeName) => connector.initProductDetailsPage(url, routeName)

export const getProductVariantData = (variationSelections, variants, categoryIds) => connector.getProductVariantData(variationSelections, variants, categoryIds)
