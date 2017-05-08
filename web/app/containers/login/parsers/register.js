/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable newline-per-chained-call */
import {getTextFrom} from '../../../utils/parser-utils'
import {parseFields, parseHiddenInputs} from './common'

const parseFormSection = ($, $formSection) => {
    return {
        heading: $formSection.find('.legend').text().trim(),
        fields: $.makeArray(parseFields($, $formSection.find('.field:not(.note)'))),
    }
}

const parseForm = ($, $form, $infoSection, $accountSection) => {
    return {
        href: $form.attr('action'),
        hiddenInputs: $.makeArray(parseHiddenInputs($, $form.find('input[type="hidden"]'))),
        submitText: getTextFrom($form, 'button[type="submit"]'),
        sections: [
            parseFormSection($, $infoSection),
            parseFormSection($, $accountSection)
        ]
    }
}

const registrationParser = ($, $html) => {
    return {
        heading: getTextFrom($html, '.login-container .block-new-customer .block-title'),
        description: getTextFrom($html, '.block-new-customer .block-content'),
        href: $html.find('.header.links a').last().attr('href'),
        form: parseForm(
            $,
            $html.find('form.form-create-account'),
            $html.find('.fieldset.create.info'),
            $html.find('.fieldset.create.account')
        ),
        requiredText: $html.find('.fieldset.create.account').attr('data-hasrequired'),
    }
}

export default registrationParser
