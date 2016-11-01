import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const LoginForm = (props) => {
    const {
        // redux-form
        handleSubmit,
        error,
        invalid,
        submitting,
        // props from parent
        href,
        fields,
        hiddenInputs,
        submitText,
        submitForm
    } = props
    const items = fields.map((field) => {
        return {
            type: 'reduxFormField',
            props: { ...field }
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
            <button type="submit" disabled={submitting}>{submitText}</button>
        </form>
    )
}


const ReduxLoginForm = reduxForm({
    form: 'login-form'
})(LoginForm)

export default ReduxLoginForm
