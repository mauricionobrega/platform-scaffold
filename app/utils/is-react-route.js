define([], function() {
    var a = document.createElement('a')

    var routeMatches = [
        /\/$/,
        /\/potions.html$/,
    ]

    var isReactRoute = function(url) {
        a.href = url
        url = a.href

        for (var i = 0; i < routeMatches.length; i++) {
            if (routeMatches[i].test(url.split(/[?#]/)[0])) {
                return true
            }
        }

        return false
    }

    return isReactRoute
})
