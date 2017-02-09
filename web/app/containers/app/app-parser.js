const appParser = ($html) => {
    return {
        isLoggedIn: !!$html.find('.customer-welcome').length
    }
}

export default appParser
