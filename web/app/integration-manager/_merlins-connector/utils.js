/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getCookieValue} from '../../utils/utils'

/**
 * Formats a floating point string as money (eg. '95.7500' -> '$95.75')
 * @param {String} price
 * @param {Boolean} isDiscount
 */
export const formatMerlinsMoney = (price, isDiscount) => {
    let val = parseFloat(price)
    if (isNaN(val)) {
        val = 0
    }
    if (isDiscount) {
        return `-$${Math.abs(val).toFixed(2)}`
    }
    return `$${val.toFixed(2)}`
}

/**
 * Multiplies the given price by quantity
 * @param {string} price
 * @param {number} quantity
 * @example
 * // Returns $95.96
 * productSubtotal('$23.99', 4)
 */
export const productSubtotal = (price, quantity) => {
    // Note: this is naive to non-dollar currencies!
    const priceInCents = price.replace(/[$,. ]/g, '')
    const subtotal = (parseInt(priceInCents) * quantity) / 100
    return formatMerlinsMoney(subtotal)
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

/**
 * Converts the given thumbnail URL to a higher resolution format
 * @param {*string} src the URL to the higher resolution image
 */
export const getHighResImage = (src) => {
    const result = src ? src.replace(/thumbnail\/\d+x\d+/, 'small_image/240x300') : src
    console.log(`getHighResImage ${src} -> ${result}`)
    return result
}
