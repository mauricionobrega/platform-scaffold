import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import FormFields from 'progressive-web-sdk/dist/components/form-fields'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import {makeRequest, formEncode} from '../../../utils/utils'

import {loginSuccess, loginFailure} from '../actions'

const submit = (values, dispatch, props) => {
    props.hiddenInputs.forEach((input) => {
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

    return makeRequest(props.href, options)
        .then((response) => {
            responseCopy = response.clone()
            return response.text()
        })
        .then((responseText) => {
            const $html = $(responseText)
            debugger
            if ($html.find('.form-login').length) {
                dispatch(loginFailure(responseCopy))
            } else {
                dispatch(loginSuccess(responseCopy))
                // window.location.href = 'customer/account'
            }
        })
        .catch((error) => {
            console.error('Failed to login due to network error.', error)
        })
}

const LoginForm = (props) => {
    const {
        handleSubmit,
        error,
        invalid,
        submitting,
        href,
        fields,
        hiddenInputs,
        submitText
    } = props
    const items = fields.map((field) => {
        return {
            type: 'reduxFormField',
            props: { ...field }
        }
    })
    return (
        <form onSubmit={handleSubmit((values, dispatch) => {
            submit(values, dispatch, props)
        })}>
            <FormFields items={items} />
            <button type="submit" disabled={submitting}>{submitText}</button>
        </form>
    )
}

LoginForm.propTypes = {
    href: PropTypes.string.isRequired,
    fields: PropTypes.array,
    hiddenInputs: PropTypes.array,
    submitText: PropTypes.string
}


const ReduxLoginForm = reduxForm({
    form: 'login-form'
})(LoginForm)

export default ReduxLoginForm
