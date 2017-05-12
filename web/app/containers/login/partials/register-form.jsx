/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import {isRegisterLoaded} from '../selectors'
import {submitRegisterForm} from '../actions'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'

import {LoginField, RememberMeTooltip} from './common'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return this.props.submitForm(values)
    }

    render() {
        const {
            error,
            submitting,
            handleSubmit,
            isFormLoaded
        } = this.props

        return (
            <form noValidate={true} onSubmit={handleSubmit(this.onSubmit)}>
                {error &&
                    <div className="u-margin-bottom-md u-color-error">
                        {error}
                    </div>
                }

                <FieldSet className="t-login__register-fieldset">
                    <LoginField
                        label="First Name"
                        name="firstname"
                        type="text"
                        />

                    <LoginField
                        label="Last Name"
                        name="lastname"
                        type="text"
                        />

                    <LoginField
                        label="Email"
                        name="email"
                        type="email"
                        />

                    <LoginField
                        label="Sign Up for Newsletter"
                        name="is_subscribed"
                        type="checkbox"
                        />
                </FieldSet>

                <FieldSet className="t-login__register-fieldset">
                    <LoginField
                        label="Password"
                        name="password"
                        type="password"
                        />

                    <LoginField
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        />

                    <LoginField
                        label="Remember Me"
                        name="persistent_remember_me"
                        type="checkbox"
                        tooltip={<RememberMeTooltip />}
                        />
                </FieldSet>

                <Button
                    className="c--primary u-width-full u-margin-top-lg"
                    type="submit"
                    disabled={submitting || !isFormLoaded}
                >
                    <span className="u-text-uppercase">Create an Account</span>
                </Button>
            </form>
        )
    }
}

RegisterForm.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    isFormLoaded: PropTypes.bool,
    submitForm: PropTypes.func,
    submitting: PropTypes.bool,
}


const ReduxRegisterForm = reduxForm({
    form: 'register-form'
})(RegisterForm)

const mapStateToProps = createPropsSelector({
    isFormLoaded: isRegisterLoaded
})

const mapDispatchToProps = {
    submitForm: submitRegisterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxRegisterForm)
