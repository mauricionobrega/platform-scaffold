/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import * as ReduxForm from 'redux-form'
import isEmail from 'validator/lib/isEmail'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

const NewsletterForm = ({handleSubmit, disabled, submitting, onSubmit}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldRow>
                <ReduxForm.Field component={Field} name="email">
                    <input
                        type="email"
                        placeholder="Enter your email..."
                        noValidate
                    />
                </ReduxForm.Field>

                <Button
                    type="submit"
                    className="c--tertiary u-margin-0 u-text-uppercase"
                    disabled={submitting || disabled}>
                    Submit
                </Button>
            </FieldRow>
        </form>
    )
}

NewsletterForm.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,
    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,
    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool,
    /**
    * Submits the form
    */
    onSubmit: React.PropTypes.func
}

const validate = (values) => {
    const errors = {}
    if (values.email && !isEmail(values.email)) {
        errors.email = 'Enter a valid email address'
    }
    return errors
}

const NewsletterReduxForm = ReduxForm.reduxForm({
    form: 'newsletterForm',
    validate,
})(NewsletterForm)

export default NewsletterReduxForm
