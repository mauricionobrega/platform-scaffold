let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initApp = (...args) => connector.initApp(...args)
