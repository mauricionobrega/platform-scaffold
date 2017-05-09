let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initHomePage = (url, routeName) => connector.initHomePage(url, routeName)
