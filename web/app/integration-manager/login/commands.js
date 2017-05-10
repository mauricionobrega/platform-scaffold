let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Login page
 */
export const initLoginPage = (url, routeName) => connector.initLoginPage(url, routeName)

/**
 * Initializes any required data for the Register page
 */
export const initRegisterPage = (url, routeName) => connector.initRegisterPage(url, routeName)

/**
 * Called when the user switches between the Sign In and Register sections.
 */
export const navigatedToSection = (router, routes, sectionName) => connector.navigatedToSection(router, routes, sectionName)

export const login = (...args) => connector.login(...args)
export const logout = (...args) => connector.logout(...args)
export const registerUser = (...args) => connector.registerUser(...args)
