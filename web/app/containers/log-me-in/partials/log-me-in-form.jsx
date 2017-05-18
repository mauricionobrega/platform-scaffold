import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import {Field as ReduxFormField, reduxForm} from 'redux-form'
import * as selectors from '../selectors'
import {submitSignInForm} from '../actions.js'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

const LogMeInFormUndecorated = (props) => {
    const onSubmit = (values) => {
        return new Promise((resolve, reject) => {
            props.submitForm(values, resolve, reject)
        })
    }
    const {
            // redux-form
            error,
            submitting,
            handleSubmit,
            // props from store
            href,
            fields,
            submitText,
        } = props
    return (
        <div className="t-log-me-in__form u-padding-md u-box-shadow u-position-relative u-z-index-1">
            <form onSubmit={handleSubmit(onSubmit)}>
                {error &&
                    <div className="u-margin-bottom-md u-color-error">
                        {error}
                    </div>
                }
                <FieldRow>
                    {fields.map((field, index) =>
                        <ReduxFormField
                            name={field.name}
                            label={field.label}
                            component={Field}
                            key={index}
                            >
                            <input type={field.type} />
                        </ReduxFormField>
                    )}
                </FieldRow>
                <FieldRow>
                    <Button
                        className="c--primary u-width-full"
                        type="submit"
                        disabled={submitting || !href}
                    >
                        <span className="u-text-uppercase">{submitText || 'Login'}</span>
                    </Button>
                </FieldRow>
            </form>
        </div>
    )
}

const validate = (values) => {
    const errors = {}
    console.log(values)

    if (!values || !values.login) {
        return errors
    }

    if ((values.login.username || '').search(/.*@?\./) < 0) {
        errors.username = 'Please enter an email address (ex: me@mydomain.xyz)'
    }

    return errors
}

const LogMeInForm = reduxForm({
    form: 'log-me-in', // a unique name for this form
    validate
})(LogMeInFormUndecorated)

LogMeInForm.propTypes = {
    error: PropTypes.string,
    fields: PropTypes.array,
    handleSubmit: PropTypes.func,
    href: PropTypes.string,
    invalid: PropTypes.bool,
    submitForm: PropTypes.func,
    submitText: PropTypes.string,
    submitting: PropTypes.bool,
}

const mapStateToProps = createPropsSelector({
    fields: selectors.signin.form.getFields,
    href: selectors.signin.form.getHref,
    submitText: selectors.signin.form.getSubmitText,
})

const mapDispatchToProps = {
    submitForm: submitSignInForm
}

export default connect(mapStateToProps, mapDispatchToProps)(LogMeInForm)
