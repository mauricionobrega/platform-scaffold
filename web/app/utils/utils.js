/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction as createReduxAction} from 'redux-actions'

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

export const splitFullName = (fullname) => {
    const names = fullname.split(' ')
    return {
        firstname: names.slice(0, -1).join(' '),
        lastname: names.slice(-1).join(' ')
    }
}

/**
 * Currently requestIdleCallback is only supported in Chrome,
 * TODO: We'll have to provide a fallback for iOS Safari
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

export const typecheck = (type, value) => {
    try {
        type.check(value)
    } catch (e) {
        console.error('Type check failed: ', e, '\n\nValue: ', value)
    }
    return value
}

export const createTypedAction = (description, type) => createReduxAction(
    description,
    (payload) => typecheck(type, payload)
)

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
