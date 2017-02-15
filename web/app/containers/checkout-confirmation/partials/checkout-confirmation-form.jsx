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
        password1,
        password2
    } = values

    if (!password1) {
        errors.password1 = 'Password is required'
    }

    if (password1 !== password2) {
        errors.password2 = 'Passwords are not the same'
    }

    if (password1.length < 6) {
        errors.password1 = 'Please enter 6 or more characters'
    }

    return errors
}

const CheckoutPaymentReduxForm = ReduxForm.reduxForm({
    form: 'paymentForm',
    validate,
})(CheckoutConfirmationForm)

const mapStateToProps = createStructuredSelector({
    // isLoggedIn: selectors.getIsLoggedIn
})

const mapDispatchToProps = {
    submitRegistrationForm: actions.submitRegisterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPaymentReduxForm)
