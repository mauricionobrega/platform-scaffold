let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initProductListPage = (...args) => connector.initProductListPage(...args)
