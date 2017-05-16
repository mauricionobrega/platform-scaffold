/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Product Details page
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initProductDetailsPage = (url, routeName) => connector.initProductDetailsPage(url, routeName)

/**
 * Called when the user selects a product variation. This provides a
 * hook so that the connector can take some action if needed.
 * @param {object} variationSelections The user's product variation selections
 * @param {object} variants The list of product variants
 * @param {object} categoryIds The list of product variation category IDs
 */
export const getProductVariantData = (variationSelections, variants, categoryIds) => connector.getProductVariantData(variationSelections, variants, categoryIds)
