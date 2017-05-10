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

export const navigateToSection = (...args) => connector.navigateToSection(...args)

export const login = (...args) => connector.login(...args)
export const logout = (...args) => connector.logout(...args)
export const registerUser = (...args) => connector.registerUser(...args)
