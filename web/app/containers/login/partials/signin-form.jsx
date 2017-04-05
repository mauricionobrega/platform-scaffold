import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {openModal, closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {SIGN_IN_SECTION} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

import {LoginField, LoginFieldTooltip} from './common'

const FORGOT_PASSWORD_PATH = '/customer/account/forgotpassword'

const tooltip = {
    title: 'What\'s this?',
    content: 'Check "Remember Me" to access your shopping cart on this computer even if you are not signed in.'
}

class SignInForm extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        return new Promise((resolve, reject) => {
            this.props.submitForm(values, resolve, reject)
        })
    }

    render() {
        const {
            // redux-form
            error,
            submitting,
            handleSubmit,
            // props from store
            isFormLoaded,
            modalOpen,
            openInfoModal,
            closeInfoModal
        } = this.props

        return (
            <form noValidate={true} onSubmit={handleSubmit(this.onSubmit)}>
                {error &&
                    <div className="u-margin-bottom-md u-color-error">
                        {error}
                    </div>
                }

                <FieldSet className="t-login__signin-fieldset">
                    <LoginField
                        label="Email"
                        name="login[username]"
                        type="email"
                        required={true}
                        />

                    <LoginField
                        label="Password"
                        name="login[password]"
                        type="password"
                        required={true}
                        forgotPassword={{href: FORGOT_PASSWORD_PATH}}
                        />

                    <LoginField
                        label="Remember Me"
                        name="persistent_remember_me"
                        type="checkbox"
                        required={false}
                        tooltip={<LoginFieldTooltip tooltip={tooltip} label="Remember Me" openModal={openInfoModal} closeModal={closeInfoModal} modalOpen={modalOpen} />}
                        />

                    <FieldRow>
                        <Button
                            className="c--primary u-width-full"
                            type="submit"
                            disabled={submitting || !isFormLoaded}
                        >
                            <span className="u-text-uppercase">Login</span>
                        </Button>
                    </FieldRow>
                </FieldSet>
            </form>
        )
    }
}

SignInForm.propTypes = {
    closeInfoModal: PropTypes.func,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    isFormLoaded: PropTypes.bool,
    modalOpen: PropTypes.bool,
    openInfoModal: PropTypes.func,
    submitForm: PropTypes.func,
    submitting: PropTypes.bool,
}


const ReduxSignInForm = reduxForm({
    form: 'signin-form'
})(SignInForm)

const mapStateToProps = createPropsSelector({
    isFormLoaded: selectors.signin.getIsFormLoaded,
    modalOpen: isModalOpen(SIGN_IN_SECTION),
})

const mapDispatchToProps = {
    closeInfoModal: () => closeModal(SIGN_IN_SECTION),
    openInfoModal: () => openModal(SIGN_IN_SECTION)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSignInForm)
