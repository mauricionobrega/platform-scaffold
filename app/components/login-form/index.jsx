import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import classNames from 'classnames'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

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
    error,
    className,
    formFields,
    handleSubmit,
    invalid,
    pristine,
    submitting,
}) => {
    const classes = classNames('c-form', className)
    const loginButtonText = submitting ? 'Logging In...' : 'Login'

    return (
        <form onSubmit={handleSubmit} className={classes}>
            {formFields ?
                <FormFields items={formFields} />
            :
                <div>
                    <SkeletonBlock className="short" width="20%" height="14px" />
                    <SkeletonBlock width="95%" height="45px" />
                    <SkeletonBlock className="short" width="20%" height="14px" />
                    <SkeletonBlock width="95%" height="45px" />
                </div>
            }
            {error && <span className="u-color-error">{error}</span>}
            <button type="submit" disabled={pristine || submitting || invalid}>{loginButtonText}</button>
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
