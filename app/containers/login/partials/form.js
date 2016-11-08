import React, {PropTypes} from 'react'
import {Field, reduxForm} from 'redux-form'

import FieldComponent from 'progressive-web-sdk/dist/components/field'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

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
    return (
        <form
            onSubmit={handleSubmit((values) => {
                return new Promise((resolve, reject) => {
                    submitForm(values, resolve, reject)
                })
            })}
            noValidate={true}
        >
            {error && <div className="u-margin-bottom-md u-color-error">{error}</div>}
            <FieldSet>
                {fields.map(({label, name, type}, idx) => {
                    return (
                        <FieldRow key={idx}>
                            <Field // Actually ReduxFormField from 'redux-form'
                                name={name}
                                label={label}
                                component={FieldComponent} // Progressive Web SDK Field Component
                            >
                                <input type={type} />
                            </Field>
                        </FieldRow>
                    )
                })}
            </FieldSet>
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
