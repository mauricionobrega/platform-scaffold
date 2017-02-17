import React from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as actions from '../actions'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

const CheckoutConfirmationForm = (props) => {
    const {
        handleSubmit,
        submitRegistrationForm,
        // disabled,
        submitting
    } = props

    return (
        <form className="t-checkout-confirmation__form" onSubmit={handleSubmit(submitRegistrationForm)} noValidate>
            <FieldRow>
                <ReduxForm.Field component={Field} name="password" label="Choose Password" caption="More than 5 characters with at least one number">
                    <input type="password" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field component={Field} name="password_confirmation" label="Re-enter Password">
                    <input type="password" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <Button
                    type="submit"
                    className="c--primary u-text-all-caps u-width-full"
                    disabled={submitting}
                >
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
    submitRegistrationForm: React.PropTypes.func,

    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool
}

const validate = (values) => {
    const errors = {}

    if (!Object.keys(values).length) {
        return {
            _error: 'Please fill in the form'
        }
    }

    const {
        password,
        password_confirmation
    } = values

    if (!password) {
        errors.password = 'Password is required'
    }

    if (password !== password_confirmation) { // eslint-disable-line camelcase
        errors.password_confirmation = 'Passwords are not the same'
    }

    if (password.length < 6) {
        errors.password = 'Please enter 6 or more characters'
    }

    return errors
}

const CheckoutPaymentReduxForm = ReduxForm.reduxForm({
    form: 'confirmationForm',
    validate,
})(CheckoutConfirmationForm)

const mapStateToProps = createStructuredSelector({
    // isLoggedIn: selectors.getIsLoggedIn
})

const mapDispatchToProps = {
    submitRegistrationForm: actions.submitRegisterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPaymentReduxForm)
