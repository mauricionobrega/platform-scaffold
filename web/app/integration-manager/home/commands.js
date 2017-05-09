let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initHomePage = (...args) => connector.initHomePage(...args)
