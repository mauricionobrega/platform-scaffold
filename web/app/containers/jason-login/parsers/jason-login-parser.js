import {getTextFrom} from '../../../utils/parser-utils'

export const parseFields = ($, $fields) => {
    return $fields.map((_, field) => {
        const $field = $(field)
        const $tooltip = $field.find('.tooltip.wrapper')
        const $input = $field.find('input')
        return {
            label: getTextFrom($field, 'label'),
            name: $input.attr('name'),
            type: $input.attr('type'),
            required: $field.hasClass('required'),
            tooltip: $tooltip.length ? {
                title: getTextFrom($tooltip, '.toggle'),
                content: getTextFrom($tooltip, '.content')
            } : false
        }
    })
}

export const parseHiddenInputs = ($, $inputs) => {
    return $inputs.map((_, input) => {
        const $input = $(input)
        return {
            name: $input.attr('name'),
            type: 'hidden',
            value: $input.val()
        }
    })
}

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

const loginParser = ($, $html) => {
    return {
        title: getTextFrom($html, '.page-title'),
        heading: getTextFrom($html, '#block-customer-login-heading'),
        description: getTextFrom($html, '.field.note'),
        href: $html.find('.header.links .authorization-link a').first().attr('href'),
        requiredText: $html.find('.fieldset.login').attr('data-hasrequired'),
        form: parseForm($, $html.find('form.form-login'))
    }
}

export default loginParser
