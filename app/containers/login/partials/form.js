import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import {makeRequest, formEncode} from '../../../utils/utils'

import {loginSuccess, loginFailure} from '../actions'

const submit = (values, {href, hiddenInputs, success, failure}) => {
    hiddenInputs.forEach((input) => {
        values[input.name] = input.value
    })

    const options = {
        method: 'POST',
        body: formEncode(values),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    let responseCopy

    return makeRequest(href, options)
        .then((response) => {
            responseCopy = response.clone()
            return response.text()
        })
        .then((responseText) => {
            const $html = $(responseText)
            if ($html.find('.form-login').length) {
                failure(responseCopy)
            } else {
                success(responseCopy)
            }
        })
        .catch((error) => {
            console.error('Failed to login due to network error.', error)
        })
}

const LoginForm = (props) => {
    const {
        // redux-form
        handleSubmit,
        error,
        invalid,
        submitting,
        // state props from parent
        href,
        fields,
        hiddenInputs,
        submitText,
        // dispatch props from parent
        success,
        failure
    } = props
    const items = fields.map((field) => {
        return {
            type: 'reduxFormField',
            props: { ...field }
        }
    })
    return (
        <form onSubmit={handleSubmit((values) => {
            submit(values, props)
        })}>
            <FormFields items={items} />
            <button type="submit" disabled={submitting}>{submitText}</button>
        </form>
    )
}


const ReduxLoginForm = reduxForm({
    form: 'login-form'
})(LoginForm)

export default ReduxLoginForm
