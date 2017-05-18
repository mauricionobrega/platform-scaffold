/* eslint-disable newline-per-chained-call */
import {getTextFrom} from '../../../utils/parser-utils'
import {parseFields, parseHiddenInputs} from './common'

const parseForm = ($, $form) => {
    return {
        href: $form.attr('action'),
        fields: $.makeArray(parseFields($, $form.find('.field:not(.note)'))),
        hiddenInputs: $.makeArray(parseHiddenInputs($, $form.find('input[type="hidden"]'))),
        submitText: getTextFrom($form, 'button[type="submit"]')
    }
}

const signinParser = ($, $html) => {
    return {
        title: getTextFrom($html, '.page-title'),
        form: parseForm($, $html.find('form.form-login'))
    }
}

export default signinParser
