let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchLoginData = (...args) => connector.fetchLoginData(...args)

export const login = (...args) => connector.login(...args)
export const registerUser = (...args) => connector.registerUser(...args)
