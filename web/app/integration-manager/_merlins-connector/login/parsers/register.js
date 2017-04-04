import {parseFields} from './common'

const parseFormSection = ($, $formSection) => {
    return {
        heading: $formSection.find('.legend').text().trim(),
        fields: $.makeArray(parseFields($, $formSection.find('.field:not(.note)'))),
    }
}

const parseForm = ($, $form, $infoSection, $accountSection) => {
    return {
        href: $form.attr('action'),
        sections: [
            parseFormSection($, $infoSection),
            parseFormSection($, $accountSection)
        ]
    }
}

const registrationParser = ($, $html) => parseForm(
    $,
    $html.find('form.form-create-account'),
    $html.find('.fieldset.create.info'),
    $html.find('.fieldset.create.account')
)

export default registrationParser
