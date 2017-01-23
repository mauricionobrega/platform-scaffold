import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectorToJS} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {SIGN_IN_SECTION} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

import {LoginField} from './common'

class SignInForm extends React.Component {
    constructor(props) {
        super(props)

        this.openSignInModal = this.openSignInModal.bind(this)
        this.closeSignInModal = this.closeSignInModal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.modalInfo = {
            openModal: this.openSigninModal,
            closeModal: this.closeSigninModal
        }

    }

    openSignInModal() {
        this.props.openInfoModal(SIGN_IN_SECTION)
    }

    closeSignInModal() {
        this.props.closeInfoModal(SIGN_IN_SECTION)
    }

    onSubmit() {
        this.props.handleSubmit((values) =>
            new Promise((resolve, reject) => {
                this.props.submitForm(values, resolve, reject)
            })
        )
    }

    render() {
        const {
            // redux-form
            error,
            submitting,
            // props from store
            href,
            fields,
            submitText,
            forgotPassword,
            modalOpen
        } = this.props

        // Ensure that modalInfo changes if and only if modalOpen changes.
        if (modalOpen !== this.modalInfo.modalOpen) {
            this.modalInfo.modalOpen = {
                ...this.modalInfo,
                modalOpen
            }
        }

        return (
            <form noValidate={true} onSubmit={this.onSubmit}>
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

const mapStateToProps = createStructuredSelector({
    fields: selectorToJS(selectors.getSigninFormFields),
    href: selectors.getSigninFormHref,
    modalOpen: selectors.getSigninInfoModalOpen,
    submitText: selectors.getSigninFormSubmitText,
    forgotPassword: selectorToJS(selectors.getSigninFormForgotPassword)
})

const mapDispatchToProps = {
    closeInfoModal: actions.closeInfoModal,
    openInfoModal: actions.openInfoModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSignInForm)
