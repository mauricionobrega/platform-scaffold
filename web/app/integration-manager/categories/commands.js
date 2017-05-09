let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initProductListPage = (url, routeName) => connector.initProductListPage(url, routeName)
