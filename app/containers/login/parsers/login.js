const parseFields = ($fields) => {
    return $fields.map((_, field) => {
        const $field = $(field)
        return {
            label: $field.find('label').text().trim(),
            name: $field.find('input').attr('name'),
            type: $field.find('input').attr('type'),
            required: $field.hasClass('required')
        }
    })
}

const parseHiddenInputs = ($inputs) => {
    return $inputs.map((_, input) => {
        const $input = $(input)
        return {
            name: $input.attr('name'),
            type: "hidden",
            value: $input.val()
        }
    })
}

const parseForm = ($form) => {
    return {
        href: $form.attr('action'),
        fields: $.makeArray(parseFields($form.find('.field:not(.note)'))),
        hiddenInputs: $.makeArray(parseHiddenInputs($form.find('input[type="hidden"]'))),
        submitText: $form.find('button[type="submit"]').text().trim()
    }
}

const loginParser = ($, $html) => {
    return {
        title: $html.find('.page-title').text().trim(),
        heading: $html.find('#block-customer-login-heading').text().trim(),
        description: $html.find('.field.note').text().trim(),
        href: $html.find('.header.links .authorization-link a').first().attr('href'),
        form: parseForm($html.find('form.form-login'))
    }
}

export default loginParser
