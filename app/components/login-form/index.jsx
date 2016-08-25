import React, {PropTypes} from 'react'
import styles from './login-form.scss'
import {Field as ReduxFormField, reduxForm} from 'redux-form'

import Field from 'progressive-web-sdk/src/components/field'

const validate = (values) => {
    const errors = {}

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email address invalid'
    }
    return errors
}

class LoginForm extends React.Component {
    render() {

        return (
            <form>
                <ReduxFormField name="email" label="E-mail" component={Field}>
                    <input type="email" />
                </ReduxFormField>
                <ReduxFormField name="password" component="input" />
            </form>
        )
    }
}


LoginForm.propTypes = {

}

LoginForm = reduxForm({
    form: 'login',
    validate
})(LoginForm)

export default LoginForm
