let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initLoginPage = (...args) => connector.initLoginPage(...args)
export const initRegisterPage = (...args) => connector.initRegisterPage(...args)
export const navigateToSection = (...args) => connector.navigateToSection(...args)
export const login = (...args) => connector.login(...args)
export const registerUser = (...args) => connector.registerUser(...args)
export const logout = (...args) => connector.logout(...args)
