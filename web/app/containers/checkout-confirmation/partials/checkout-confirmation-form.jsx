import React from 'react'
import * as ReduxForm from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

const CheckoutConfirmationForm = (props) => {
    const {
        handleSubmit, // @TODO: How are actions handled???
        // disabled,
        // submitting
    } = props

    return (
        <form className="t-checkout-confirmation__form" onSubmit={handleSubmit} noValidate>
            <FieldRow>
                <ReduxForm.Field component={Field} name="password1" label="Choose Password" caption="More than 5 characters with at least one number">
                    <input type="password" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field component={Field} name="password2" label="Re-enter Password">
                    <input type="password" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <Button onClick={handleSubmit} className="c--primary u-text-all-caps u-width-full">
                    Create Account
                </Button>
            </FieldRow>
        </form>
    )
}

CheckoutConfirmationForm.propTypes = {
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
    submitting: React.PropTypes.bool
}

const validate = (values) => {
    const errors = {}
    if (values.email && !values.email.match('@')) {  // Obviously not for real
        errors.email = 'Enter a valid email address'
    }
    return errors
}

const CheckoutPaymentReduxForm = ReduxForm.reduxForm({
    form: 'paymentForm',
    validate,
})(CheckoutConfirmationForm)

export default CheckoutPaymentReduxForm
