import React, {PropTypes} from 'react'
import {Field as ReduxFormField, reduxForm} from 'redux-form'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectorToJS} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {SIGN_IN_SECTION} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

import {LoginFieldTooltip, LoginFieldLabel} from './common'

const SigninField = ({label, required, type, forgotPassword, name, tooltip, openModal, closeModal, modalOpen}) => (
    <FieldRow>
        <ReduxFormField
            name={name}
            label={<LoginFieldLabel label={label} required={required} type={type} forgotPassword={forgotPassword} />}
            component={Field}
            >
            <input type={type} />
        </ReduxFormField>

        {tooltip && <LoginFieldTooltip tooltip={tooltip} label={label} openModal={openModal} closeModal={closeModal} modalOpen={modalOpen} />}
    </FieldRow>
)

const SigninFields = ({fields, forgotPassword, openModal, closeModal, modalOpen}) => (
    <div>
        {fields.map((field, idx) =>
            <SigninField {...field} key={idx} openModal={openModal} closeModal={closeModal} modalOpen={modalOpen} forgotPassword={forgotPassword} />
        )}
    </div>
)

class SignInForm extends React.Component {
    constructor(props) {
        super(props)

        this.openSignInModal = this.openSignInModal.bind(this)
        this.closeSignInModal = this.closeSignInModal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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

        return (
            <form
                noValidate={true}
                onSubmit={this.onSubmit}
            >
                {error &&
                    <div className="u-margin-bottom-md u-color-error">
                        {error}
                    </div>
                }

                <FieldSet className="t-login__signin-fieldset">
                    {<SigninFields fields={fields} forgotPassword={forgotPassword} openModal={this.openSignInModal} closeModal={this.closeSignInModal} modalOpen={modalOpen} />}

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
