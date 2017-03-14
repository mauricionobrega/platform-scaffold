let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchProductListData = (...args) => connector.fetchProductListData(...args)
