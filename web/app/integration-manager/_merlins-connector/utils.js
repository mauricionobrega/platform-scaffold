import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getCookieValue} from '../../utils/utils'

export const submitForm = (url, data, options) => {
    console.log('Submitting form to ', url, data, options)

    // The form_key is a session-level value. If there is
    // a form_key cookie, that trumps all!
    const formKey = getCookieValue('form_key')
    if (formKey) {
        console.warn('Overriding form_key with cookie value:', formKey)
        data.form_key = formKey
    }

    return makeFormEncodedRequest(url, data, options)
}
