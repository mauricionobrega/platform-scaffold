import {createAction as actionCreator} from 'redux-act'

// simplify redux-act createAction method.
// usage: createAction('Update Campaign', 'id', 'update')
// instead of: createAction('Update Campaign', (id, update) => ({id, update}))
export const createAction = (description, ...argNames) => {
    let payloadReducer

    if (argNames.length) {
        payloadReducer = (...args) => {
            const payload = {}

            argNames.forEach((arg, index) => {
                payload[arg] = args[index]
            })

            return payload
        }
    }

    return actionCreator(description, payloadReducer)
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
 * Retrieve the registered name of a component as a string
 * @param {object} component - a React component, potentially wrapped with react-redux
 * @returns {string} - The registered name of the given component
 */
export const getComponentName = (component) => {
    const name = component.name
    return name === 'Connect' ? component.WrappedComponent.name : name
}

/**
 * Validate email
 * @param {string} email - email string to validate
 * @returns {boolean} - validation result
 */
export const isEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

/**
 * Wraps an action creator function so that the React synthetic action
 * is not passed in. This is necessary to avoid spurious warnings from
 * the React code.
 * @param {function} fn - an action creator function
 * @returns {function} - the wrapped action creator
 */
export const stripEvent = (fn) => () => fn()
