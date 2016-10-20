import {createAction as actionCreator} from 'redux-act'
import Immutable from 'immutable'

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
        pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    })
    return pairs.join('&').replace(/%20/g, '+')
}

/**
 * Extract all of the JSON pieces in 'text/x-magento-init' script
 * elements, and merge them together into a single configuration object
 */
export const extractMagentoJson = ($html) => {
    return $html
        .find('script[x-type="text/x-magento-init"]')
        .map((_, item) => item.innerHTML)
        .get()
        .map(JSON.parse)
        .map((item) => Immutable.fromJS(item))
        .reduce((summary, item) => summary.mergeDeep(item), Immutable.Map())
}
