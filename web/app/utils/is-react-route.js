import ReactRegexes from '../loader-routes'

const isReactRoute = (url) => {
    return ReactRegexes.some((regex) => regex.test(url))
}

export default isReactRoute
