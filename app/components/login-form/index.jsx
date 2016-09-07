import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'

import classNames from 'classnames'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'

const validate = (values) => {
    const errors = {}

    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email address invalid'
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
    form: 'auto-form',
    validate
})(LoginForm)

LoginForm.propTypes = {
    className: PropTypes.string,
    formFieldDescriptor: PropTypes.array,
    handleSubmit: PropTypes.function,
    invalid: PropTypes.boolean,
    pristine: PropTypes.booean,
    submitting: PropTypes.booean,
}

export default LoginForm
