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

export const submitForm = (url, data, options) => {
    // The form_key is a session-level value. If there is
    // a form_key cookie, that trumps all!
    const formKey = getCookieValue('form_key')
    if (formKey) {
        data.form_key = formKey
    }

    return makeFormEncodedRequest(url, data, options)
}
