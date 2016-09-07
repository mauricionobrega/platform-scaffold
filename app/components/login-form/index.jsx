import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import classNames from 'classnames'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'

const validate = (values) => {
    const errors = {
        login: {}
    }

    const email = values.login && values.login.username
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.login.username = 'Email address invalid'
    }
    return errors
}

let LoginForm = ({
    className,
    formFieldDescriptor,
    handleSubmit,
    invalid,
    pristine,
    submitting,
}) => {
    const classes = classNames('c-form', className)

    return (
        <form onSubmit={handleSubmit} className={classes}>
            <FormFields descriptor={formFieldDescriptor} />
            <button type="submit" disabled={pristine || submitting || invalid}>Login</button>
        </form>
    )
}

LoginForm = reduxForm({
    enableReinitialize: true,
    form: 'login-form',
    validate
})(LoginForm)

LoginForm.propTypes = {
    className: PropTypes.string,
    formFieldDescriptor: PropTypes.array,
}

LoginForm = connect(
    (state) => {
        return {
            initialValues: state.login.toJS().loginForm.initialValues
        }
    }
)(LoginForm)

export default LoginForm
