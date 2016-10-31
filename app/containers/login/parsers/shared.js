const parseFields = ($fields) => {
    return $fields.map((_, field) => {
        const $field = $(field)
        // const $error = $field.find('.mage-error')
        return {
            label: $field.find('label').text().trim(),
            name: $field.find('input').attr('name'),
            type: $field.find('input').attr('type'),
            required: $field.hasClass('required'),
            // error: $error.length ? $error.text() : null
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

const sharedParser = ($, $html) => {
    const $loginForm = $html.find('form.form-login')
    const $registerForm = $html.find('form.form-create-account')
    const isLogin = $loginForm.length ? true : false

    return {
        title: $html.find('.page-title').text().trim(),
        isLogin,
        login: {
            href: $html.find('.header.links .authorization-link a').first().attr('href'),
            panelTitle: "Sign In",
            heading: $html.find('#block-customer-login-heading').text().trim(),
            description: $html.find('.field.note').text().trim(),
            form: isLogin ? parseForm($loginForm) : {}
        },
        register: {
            href: $html.find('.header.links li:last-child a').first().attr('href'),
            panelTitle: "Register",
        //     heading: $html.find('#block-new-customer-heading').text().trim(),
        //     description: $html.find('[aria-labelledby="block-new-customer-heading"]').text().trim(),
            form: isLogin ? {} : parseForm($registerForm)
        }
    }
}

export default sharedParser
