/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {isModalOpen} from '../../../store/selectors'
import {openModal, closeModal} from '../../../store/modals/actions'
import {SIGN_IN_SECTION} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

import {LoginField} from './common'

class SignInForm extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)

        // Props from `mapDispatchToProps` should never change
        // so it's OK that we do this once and for all
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
            // props from store
            href,
            fields,
            submitText,
            forgotPassword,
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

                <FieldSet className="t-login__signin-fieldset">
                    {fields.map((field, idx) =>
                        <LoginField {...field} key={idx} modalInfo={this.modalInfo} forgotPassword={forgotPassword} />
                    )}

                    <FieldRow>
                        <Button
                            className="c--primary u-width-full"
                            type="submit"
                            disabled={submitting || !href}
                        >
                            <span className="u-text-uppercase">{submitText || 'Login'}</span>
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
    fields: PropTypes.array,
    forgotPassword: PropTypes.object,
    handleSubmit: PropTypes.func,
    href: PropTypes.string,
    invalid: PropTypes.bool,
    modalOpen: PropTypes.bool,
    openInfoModal: PropTypes.func,
    submitForm: PropTypes.func,
    submitText: PropTypes.string,
    submitting: PropTypes.bool,
}


const ReduxSignInForm = reduxForm({
    form: 'signin-form'
})(SignInForm)

const mapStateToProps = createPropsSelector({
    fields: selectors.signin.form.getFields,
    href: selectors.signin.form.getHref,
    modalOpen: isModalOpen(SIGN_IN_SECTION),
    submitText: selectors.signin.form.getSubmitText,
    forgotPassword: selectors.signin.form.getForgotPassword
})

const mapDispatchToProps = {
    closeInfoModal: () => closeModal(SIGN_IN_SECTION),
    openInfoModal: () => openModal(SIGN_IN_SECTION)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSignInForm)
