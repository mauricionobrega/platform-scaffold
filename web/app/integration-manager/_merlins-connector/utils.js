import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getCookieValue} from '../../utils/utils'

/**
 * Formats a floating point string as money (eg. '95.7500' -> '$95.75')
 */
export const formatMerlinsMoney = (price) => {
    let val = parseFloat(price)
    if (isNaN(val)) {
        val = 0
    }
    return `$${val.toFixed(2)}`
}

/**
 * Parses the given price and returns it as cents
 * @param {String} price The price formatted as a string with a currency symbol. Eg '$23.99'
 * @example
 * // Returns 1523
 * parsePriceToCents('$15.23')
 */
export const parsePriceToCents = (price) => {
    // Note: this is naive to non-dollar currencies!
    const priceInCents = price.replace(/[$,. ]/g, '')
    return parseInt(priceInCents)
}

/**
 * Converts an HTML text snippet into raw text.
 * @param {String} fragment
 * @example
 * ie. '<span class=\"price\">$14.00<\/span>' => '$14.00'
 */
export const textFromFragment = (fragment) => {
    const e = document.createElement('div')
    e.innerHTML = fragment
    return e.textContent.trim()
}

export const submitForm = (url, data, options) => {
    // The form_key is a session-level value. If there is
    // a form_key cookie, that trumps all!
    const formKey = getCookieValue('form_key')
    if (formKey) {
        data.form_key = formKey
    }

    return makeFormEncodedRequest(url, data, options)
}
