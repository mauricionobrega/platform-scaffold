let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchLoginData = (...args) => connector.fetchLoginData(...args)

export const submitLoginForm = (...args) => connector.submitLoginForm(...args)

export const navigateToSection = (...args) => connector.navigateToSection(...args)

export const submitRegistrationForm = (...args) => connector.submitRegistrationForm(...args)
