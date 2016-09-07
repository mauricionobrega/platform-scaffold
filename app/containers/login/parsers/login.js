// import parseInput from 'progressive-web-sdk/dist/parsing/input-parser'

const loginParser = ($, $html) => {
    const $loginForm = $html.find('form.form-login')

    // const fields = $.makeArray($loginForm.find('input')).map((input) => {
    //     const inputProps = parseInput(input)
    //
    //     return {
    //         type: 'field',
    //         props: {
    //             ...inputProps,
    //             label: inputProps.title
    //         }
    //     }
    // })

    return {
        page: 'login',
        // loginForm: {
        //     fields,
        // }
    }
}

export default loginParser
