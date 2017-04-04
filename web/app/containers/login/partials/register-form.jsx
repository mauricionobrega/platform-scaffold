import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {openModal, closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {REGISTER_SECTION} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'

import {LoginField} from './common'

const tooltip = {
    title: 'What\'s this?',
    content: 'Check "Remember Me" to access your shopping cart on this computer even if you are not signed in.'
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)

        this.modalInfo = {
            openModal: props.openInfoModal,
            closeModal: props.closeInfoModal
        }
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
            // props from parent
            isFormLoaded,
            modalOpen
        } = this.props

        // Ensure that modalInfo changes if and only if modalOpen changes.
        if (modalOpen !== this.modalInfo.modalOpen) {
            this.modalInfo = {
                ...this.modalInfo,
                modalOpen
            }
        }

        return (
            <form noValidate={true} onSubmit={handleSubmit(this.onSubmit)}>
                {error &&
                    <div className="u-margin-bottom-md u-color-error">
                        {error}
                    </div>
                }

                <FieldSet className="t-login__register-fieldset">
                    <div className="u-margin-bottom">
                        <h3 className="u-color-brand u-text-font-family u-text-normal">
                            Personal Information
                        </h3>
                    </div>

                    <LoginField
                        label="First Name"
                        name="firstname"
                        type="text"
                        required={true}
                        modalInfo={this.modalInfo}
                        />

                    <LoginField
                        label="Last Name"
                        name="lastname"
                        type="text"
                        required={true}
                        modalInfo={this.modalInfo}
                        />

                    <LoginField
                        label="Email"
                        name="email"
                        type="email"
                        required={true}
                        modalInfo={this.modalInfo}
                        />

                    <LoginField
                        label="Sign Up for Newsletter"
                        name="is_subscribed"
                        type="checkbox"
                        required={false}
                        modalInfo={this.modalInfo}
                        />
                </FieldSet>

                <FieldSet className="t-login__register-fieldset">
                    <div className="u-margin-bottom">
                        <h3 className="u-color-brand u-text-font-family u-text-normal">
                            Sign-in Information
                        </h3>
                    </div>

                    <LoginField
                        label="Password"
                        name="password"
                        type="password"
                        required={true}
                        modalInfo={this.modalInfo}
                        />

                    <LoginField
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        required={true}
                        modalInfo={this.modalInfo}
                        />

                    <LoginField
                        label="Remember Me"
                        name="persistent_remember_me"
                        type="checkbox"
                        required={false}
                        modalInfo={this.modalInfo}
                        tooltip={tooltip}
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
    closeInfoModal: PropTypes.func,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    href: PropTypes.string,
    invalid: PropTypes.bool,
    isFormLoaded: PropTypes.bool,
    modalOpen: PropTypes.bool,
    openInfoModal: PropTypes.func,
    submitForm: PropTypes.func,
    submitting: PropTypes.bool,
}


const ReduxRegisterForm = reduxForm({
    form: 'register-form'
})(RegisterForm)

const mapStateToProps = createPropsSelector({
    isFormLoaded: selectors.register.getIsFormLoaded,
    modalOpen: isModalOpen(REGISTER_SECTION),
})

const mapDispatchToProps = {
    closeInfoModal: () => closeModal(REGISTER_SECTION),
    openInfoModal: () => openModal(REGISTER_SECTION)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxRegisterForm)
