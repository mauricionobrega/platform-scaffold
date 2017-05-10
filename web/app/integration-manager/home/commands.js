let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Home page
 */
export const initHomePage = (url, routeName) => connector.initHomePage(url, routeName)
