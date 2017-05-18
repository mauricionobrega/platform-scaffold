/* eslint-disable newline-per-chained-call */
import {getTextFrom} from '../../../utils/parser-utils'
import {parseFields, parseHiddenInputs} from './common'

const parseForm = ($, $form) => {
    return {
        href: $form.attr('action'),
        forgotPassword: {
            href: $form.find('.action.remind').attr('href'),
            title: getTextFrom($form, '.action.remind')
        },
        fields: $.makeArray(parseFields($, $form.find('.field:not(.note)'))),
        hiddenInputs: $.makeArray(parseHiddenInputs($, $form.find('input[type="hidden"]'))),
        submitText: getTextFrom($form, 'button[type="submit"]')
    }
}

const signinParser = ($, $html) => {
    return {
        title: getTextFrom($html, '.page-title'),
        href: $html.find('.header.links .authorization-link a').first().attr('href'),
        form: parseForm($, $html.find('form.form-login'))
    }
}

export default signinParser
