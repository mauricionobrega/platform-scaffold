let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Product List page
 */
export const initProductListPage = (url, routeName) => connector.initProductListPage(url, routeName)
