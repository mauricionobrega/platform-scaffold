import React, {PropTypes} from 'react'
import styles from './login-form.scss'
import {Field as ReduxFormField, reduxForm} from 'redux-form'

import Field from 'progressive-web-sdk/src/components/field'

const validate = (values) => {
    const errors = {}

    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email address invalid'
    }
    return errors
}

let LoginForm = ({
    invalid,
    pristine,
    submitting,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <ReduxFormField name="email" label="E-mail" component={Field}>
                <input type="email" />
            </ReduxFormField>
            <ReduxFormField name="password" label="Password" component={Field}>
                <input type="password" />
            </ReduxFormField>
            <button type="submit" disabled={pristine || submitting || invalid}>Login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
}

LoginForm = reduxForm({
    form: 'login',
    validate
})(LoginForm)

export default LoginForm
