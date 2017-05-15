/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

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

export const createAnalyticsMeta = (type, payload) => ({
    analytics: {
        type,
        payload
    }
})

/**
 * createActionWithMeta - creates action with meta
 *
 * The parameter after the last payload parameter will always be the meta payload
 *
 * Usage:
 *
 * = Creating the action =
 * export const actionVariable = createActionWithMeta('Action name',
 *      ['parameter1', 'parameter2']                                // The parameter name to map to payload
 *      (parameter1, parameter2, parameter3) => (parameter3)        // The meta payload creator - this tells the action which parameter to use for meta payload
 * )
 *
 *
 * You can also create meta payload from payload as well
 * export const actionVariable = createActionWithMeta('Action name',
 *      ['parameter1', 'parameter2']
 *      (parameter1, parameter2) => ({
 *          analytics: {
 *              type: parameter1,
 *              payload: {
 *                  name: parameter2
 *              }
 *          }
 *      })
 * )
 *
 * = Dispatching the action =
 * dispatch(actionVariable('abc', 'def', {
 *      analytics: {                            // Define meta payload here: It must be in FSA standard
 *          type: 'Pageview',
 *          payload: {
 *              name: 'PLP'
 *          }
 *      }
 * }))
 *
 * = Using convient meta payload creator for analytic =
 * dispatch(actionVariable('abc', 'def', createAnalyticsMeta('Pageview', {
 *      name: 'PLP'
 * })
 *
 * Note: The intention of this function is to replace createAction utilty function defined above
 *
 * @description {string} - a unique name for the action
 * @payloadArgumentNames {array} - an array of strings that identifies each parameter
 */
export const createActionWithMeta = (description, payloadArgumentNames, metaCreator) => {
    return createReduxAction(
        description,
        payloadArgumentNames.length ?
            (...args) => fromPairs(payloadArgumentNames.map((arg, idx) => [arg, args[idx]]))
            : null,
        metaCreator ? metaCreator : null

    )
}

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


/**
 * Currently requestIdleCallback is only supported in Chrome,
 * we'll have to provide a fallback for iOS Safari
 * https://developers.google.com/web/updates/2015/08/using-requestidlecallback
 * http://caniuse.com/#feat=requestidlecallback
 */
export const requestIdleCallback = (fn) => {
    if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(fn)
    } else {
        return setTimeout(() => fn(), 1)
    }
}


export const parseLocationData = (formValues, registeredFieldNames) => {
    // Default values to use if none have been selected
    const address = {country_id: 'US', region_id: '0', postcode: null}

    if (formValues) {
        // Only return the field value if the field is registered
        const getRegisteredFieldValue = (fieldName) => {
            return registeredFieldNames.includes(fieldName) ? formValues[fieldName] : undefined
        }

        const countryId = getRegisteredFieldValue('country_id')
        if (countryId) {
            address.country_id = countryId
        }

        const postcode = getRegisteredFieldValue('postcode')
        if (postcode) {
            address.postcode = postcode
        }

        if (formValues.region) {
            address.region = getRegisteredFieldValue('region')
            // Remove the region_id in case we have an old value
            delete address.region_id
        } else {
            address.region_id = getRegisteredFieldValue('region_id')
        }
    }

    return address
}


export const buildQueryString = (query) => {
    return query.replace(/ /g, '+')
}
