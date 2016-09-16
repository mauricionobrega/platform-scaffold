import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import classNames from 'classnames'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

// For more info on synchronous validation
// see http://redux-form.com/6.0.5/examples/syncValidation/
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
    const classes = classNames('c-form login-form', className)
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
    error: PropTypes.string,
    formFields: PropTypes.array,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
}

export const mapStateToProps = (state, props) => {
    return {
        initialValues: state.login.toJS().loginForm.initialValues
    }
}

LoginForm = connect(
    mapStateToProps
)(LoginForm)

export default LoginForm
