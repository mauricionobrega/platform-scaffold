import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const Form = (props) => {
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
        <form onSubmit={handleSubmit((values) => {
            submitForm(values)
        })}>
            <FormFields items={items} />
            <button type="submit" disabled={submitting}>{submitText}</button>
        </form>
    )
}


const ReduxForm = reduxForm({
    form: 'login-form'
})(Form)

export default ReduxForm
