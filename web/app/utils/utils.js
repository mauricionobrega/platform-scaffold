
/**
 * Wraps an action creator function so that the React synthetic action
 * is not passed in. This is necessary to avoid spurious warnings from
 * the React code.
 * @param {function} fn - an action creator function
 * @returns {function} - the wrapped action creator
 */
export const stripEvent = (fn) =>
/* istanbul ignore next */
    () => fn()

/**
 * Returns a path given a `location` object.
 * @param {object} location - a location object from React Router
 * @returns {string} - the `path` and `search` concatenated together
 */
export const getPath = ({pathname, search}) => pathname + search

/**
 * Returns a full URL given a `location` object.
 * @param {object} location - a location object from React Router
 * @returns {string} - the full URL for the given location
 */
export const getURL = (location) =>
    window.location.origin + getPath(location)


// Regex courtesy of https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
export const getCookieValue = (cookieName) => {
    const result = document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1')
    return result
}


// converts the image URL to a high resolution format
export const getHighResImage = (src) => {
    return src.replace(/thumbnail\/\d+x\d+/, 'small_image/240x300')
}
