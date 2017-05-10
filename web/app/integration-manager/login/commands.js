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

/**
 * Logs the user in with the given credentials
 * @param {string} username The user's username
 * @param {string} password The password provided by the user in clear text
 * @param {boolean} rememberMe `true` if the login should be persistent (this may be ignored by the connector)
 */
export const login = (username, password, rememberMe) => connector.login(username, password, rememberMe)

export const logout = (...args) => connector.logout(...args)
export const registerUser = (...args) => connector.registerUser(...args)
