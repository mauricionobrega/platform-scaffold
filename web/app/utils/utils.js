import {createAction as createReduxAction} from 'redux-actions'
import fromPairs from 'lodash.frompairs'

// simplify redux-actions createAction method.
// usage: createAction('Update Campaign', 'id', 'update')
// instead of: createAction('Update Campaign', (id, update) => ({id, update}))
export const createAction = (description, ...argNames) => {
    return createReduxAction(
        description,
        argNames.length ?
            (...args) => fromPairs(argNames.map((arg, idx) => [arg, args[idx]]))
            : null
    )
}

/**
 * Retrieve the wrapped component if there is one, otherwise just returns the passed-in component
 * @param {object} component - a React component, potentially wrapped with react-redux
 * @returns {object} - The component or the WrappedComponent if it exists
 */
export const getComponentType = (component) => {
    return component.WrappedComponent || component
}

/**
 * Wraps an action creator function so that the React synthetic action
 * is not passed in. This is necessary to avoid spurious warnings from
 * the React code.
 * @param {function} fn - an action creator function
 * @returns {function} - the wrapped action creator
 */
export const stripEvent = (fn) => () => fn()


/**
 * Converts a full URL to the preferred format for keying the redux store,
 * i.e. the path and query string
 */

export const urlToPathKey = (url) => {
    if (/^\//.test(url)) {
        // The URL is already relative, so just return it
        return url
    }
    const urlObject = new URL(url)

    return `${urlObject.pathname}${urlObject.search}`
}
