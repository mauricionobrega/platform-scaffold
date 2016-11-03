import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'

const LoginForm = (props) => {
    const {
        // redux-form
        handleSubmit,
        error,
        submitting,
        // props from parent
        fields,
        submitText,
        submitForm
    } = props
    const items = fields.map((field) => {
        return {
            type: 'reduxFormField',
            props: {...field}
        }
    })
    return (
        <form
            onSubmit={handleSubmit((values) => {
                return new Promise((resolve, reject) => {
                    submitForm(values, resolve, reject)
                })
            })}
        >
            {error && <span>{error}</span>}
            <FormFields items={items} />
            <button className="c-button c--primary u-width-full u-margin-top-lg" type="submit" disabled={submitting}>{submitText}</button>
        </form>
    )
}

LoginForm.propTypes = {
    error: PropTypes.string,
    fields: PropTypes.array,
    handleSubmit: PropTypes.func,
    href: PropTypes.string,
    invalid: PropTypes.bool,
    submitForm: PropTypes.func,
    submitText: PropTypes.string,
    submitting: PropTypes.bool,
}


const ReduxLoginForm = reduxForm({
    form: 'login-form'
})(LoginForm)

export default ReduxLoginForm
