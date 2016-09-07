// import parseInput from 'progressive-web-sdk/dist/parsing/input-parser'

const loginParser = ($, $html) => {
    const $loginForm = $html.find('form.form-login')

    const initialValues = {}

    const fields = $.makeArray($loginForm.find('input')).map((input) => {
        if (input.value) {
            initialValues[input.name] = input.value
        }

        return {
            type: 'reduxFormField',
            props: {
                type: input.type,
                name: input.name,
                label: input.title,
            }
        }
    })

    return {
        page: 'login',
        loginForm: {
            fields,
            initialValues
        }
    }
}

export default loginParser
