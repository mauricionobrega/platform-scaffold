let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchHomeData = (...args) => connector.fetchHomeData(...args)
