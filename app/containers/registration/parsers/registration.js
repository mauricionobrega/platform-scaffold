/* eslint-disable newline-per-chained-call */

const parseFields = ($fields) => {
    return $fields.map((_, field) => {
        const $field = $(field)
        const $tooltip = $field.find('.tooltip.wrapper')
        return {
            label: $field.find('label').text().trim(),
            name: $field.find('input').attr('name'),
            type: $field.find('input').attr('type'),
            required: $field.hasClass('required'),
            tooltip: $tooltip.length ? {
                title: $tooltip.find('.toggle').text().trim(),
                content: $tooltip.find('.content').text().trim()
            } : false
        }
    })
}

const parseHiddenInputs = ($inputs) => {
    return $inputs.map((_, input) => {
        const $input = $(input)
        return {
            name: $input.attr('name'),
            type: 'hidden',
            value: $input.val()
        }
    })
}

const parseFormSection = ($formSection) => {
    return {
        heading: $formSection.find('.legend').text().trim(),
        fields: $.makeArray(parseFields($formSection.find('.field:not(.note)'))),
    }
}

const parseForm = ($form, $infoSection, $accountSection) => {
    return {
        href: $form.attr('action'),
        hiddenInputs: $.makeArray(parseHiddenInputs($form.find('input[type="hidden"]'))),
        submitText: $form.find('button[type="submit"]').text().trim(),
        sections: [
            parseFormSection($infoSection),
            parseFormSection($accountSection)
        ]
    }
}

const registrationParser = ($, $html) => {
    return {
        heading: $html.find('#block-customer-login-heading').text().trim(),
        description: $html.find('.block-new-customer .block-content').text().trim(),
        href: $html.find('.header.links a').last().attr('href'),
        form: parseForm(
            $html.find('form.form-create-account'),
            $html.find('.fieldset.create.info'),
            $html.find('.fieldset.create.account')
        ),
        requiredText: $html.find('.fieldset.create.account').attr('data-hasrequired'),
    }
}

export default registrationParser
