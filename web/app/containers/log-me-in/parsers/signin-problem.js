/* eslint-disable newline-per-chained-call */
import {getTextFrom} from '../../../utils/parser-utils'
import {parseFields, parseHiddenInputs} from './common'

const parseForm = ($, $form) => {
    return {
        href: $form.attr(/* WHAT ATTRIBUTE? */),
        fields: $.makeArray(parseFields($, $form.find('.field:not(.note)'))),
        hiddenInputs: $.makeArray(parseHiddenInputs($, /* WHAT ELEMENTS? */)),
        submitText: getTextFrom($form, /* WHAT CSS SELECTOR? */)
    }
}

const signinParser = ($, $html) => {
    return {
        title: getTextFrom($html, /* WHAT CLASS? */),
        form: parseForm($, $html.find(/* WHAT ELEMENT? */))
    }
}

export default signinParser
