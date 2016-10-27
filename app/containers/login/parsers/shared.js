const parseFields = ($fields) => {
    return $fields.map((_, field) => {
        const $field = $(field)
        const $error = $field.find('.mage-error')
        return {
            label: $field.find('label').text().trim(),
            name: $field.find('input').attr('name'),
            type: $field.find('input').attr('type'),
            required: $field.hasClass('required'),
            error: $error.length ? $error.text() : null
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

const sharedParser = ($, $html, isLogin) => {
    const $form = $html.find('form.form-login')
    return {
        title: $html.find('.page-title').text().trim(),
        isLogin,
        login: {
            panelTitle: "Sign In",
            heading: $html.find('#block-customer-login-heading').text().trim(),
            description: $html.find('.field.note').text().trim(),
            form: {
                href: $form.attr('action'),
                fields: $.makeArray(parseFields($form.find('.field:not(.note)'))),
                hiddenInputs: $.makeArray(parseHiddenInputs($form.find('input[type="hidden"]'))),
                submitText: $form.find('button[type="submit"]').text().trim()
            }
        },
        register: {
            href: $html.find('.block-new-customer .actions-toolbar a').attr('href'),
            panelTitle: "Register",
            heading: $html.find('#block-new-customer-heading').text().trim(),
            description: $html.find('[aria-labelledby="block-new-customer-heading"]').text().trim(),
            form: {
                href: "",
                fields: [],
                hiddenInputs: [],
                submitText: ""
            }
        }
    }
}

export default sharedParser
