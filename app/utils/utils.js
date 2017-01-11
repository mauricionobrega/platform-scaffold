import {createAction as createReduxAction} from 'redux-actions'
import fromPairs from 'lodash/fromPairs'

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

export const makeRequest = (url, options) => {
    return fetch(url, {...options, credentials: 'same-origin'})
}

/**
 * Form encodes nested URL query parameters using recursion
 * Copypasta from http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
*/
const serialize = function(obj, prefix) {
    const str = []
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            const k = prefix ? `${prefix}[${p}]` : p
            const v = obj[p]
            str.push((v !== null && typeof v === 'object') ?
            serialize(v, k) :
            `${window.encodeURIComponent(k)}=${window.encodeURIComponent(v)}`)
        }
    }
    return str.join('&')
}

/**
 * Form-encode an arbitrary JS object.
 */
export const formEncode = (data) => {
    return serialize(data)
}

/**
 * Make a request given the provided url and options, form-encoding the data
 * into the body of the request.
 */
export const makeFormEncodedRequest = (url, data, options) => {
    return makeRequest(url, {
        ...options,
        body: formEncode(data),
        headers: {
            ...(options.headers || {}),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
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
