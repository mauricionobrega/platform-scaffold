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
 * Form-encode an arbitrary JS object.
 */
export const formEncode = (data) => {
    const pairs = []
    Object.keys(data).forEach((k) => {
        const val = data[k]
        // A shoddy way of handling params like apple[banana]
        // Meant to be TEMPORARY
        // TODO: Remove and replace with something legit before merging this PR
        if (typeof val === 'object') {
            Object.keys(val).forEach((vk) => {
                pairs.push(`${encodeURIComponent(k)}[${encodeURIComponent(vk)}]=${encodeURIComponent(val[vk])}`)
            })
        } else {
            pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(val)}`)
        }
    })
    return pairs.join('&').replace(/%20/g, '+')
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
