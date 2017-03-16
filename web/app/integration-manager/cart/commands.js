let connector = {}

export const register = (commands) => {
    connector = commands
}

export const getCart = (...args) => connector.getCart(...args)
