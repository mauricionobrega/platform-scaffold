import React, {PropTypes} from 'react'
import {Field, reduxForm} from 'redux-form'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectorToJS} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {SIGN_IN_SECTION} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldComponent from 'progressive-web-sdk/dist/components/field'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Link from 'progressive-web-sdk/dist/components/link'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const FieldLabel = ({label, required, type, forgotPassword}) => (
    <span>
        {label} {required && <span>*</span>}

        {type === 'password' && forgotPassword &&
            <Link className="u-float-end u-text-normal" href={forgotPassword.href}>
                {forgotPassword.title}
            </Link>
        }
    </span>
)

FieldLabel.propTypes = {
    forgotPassword: PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string
    }),
    label: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
}

const SheetHeader = ({label, closeModal}) => (
    <div className="u-width-full u-bg-color-brand u-color-neutral-10 u-flexbox">
        <h1 className="u-flex u-padding-md u-h4 u-text-uppercase">
            {label}
        </h1>

        <Button onClick={closeModal}>
            <Icon name="close" />
            <span className="u-visually-hidden">Close</span>
        </Button>
    </div>
)

const renderFields = (fields, forgotPassword, openModal, closeModal, modalOpen) => {
    return fields.map(({label, name, type, required, tooltip, disabled}, idx) => {
        const labelNode = (<FieldLabel label={label} required={required} type={type} forgotPassword={forgotPassword} />)

        return (
            <FieldRow key={idx}>
                {/*
                    Actually ReduxFormField from 'redux-form' into
                    which we pass the Progressive Web SDK Field component
                */}
                <Field name={name} label={labelNode} component={FieldComponent}>
                    <input type={type} />
                </Field>

                {tooltip &&
                    <div>
                        <a href="#remember-me" onClick={openModal}>
                            {tooltip.title}
                        </a>

                        <Sheet
                            className="t-login__remember-me-modal"
                            open={modalOpen}
                            onDismiss={closeModal}
                            effect="slide-bottom"
                            headerContent={<SheetHeader label={label} closeModal={closeModal} />}
                        >
                            <div id="remember-me" className="u-padding-md">
                                {tooltip.content}
                            </div>

                            <div className="t-login__remember-me-button u-padding-md">
                                <Button
                                    className="c-button c--secondary u-text-uppercase u-margin-top-lg u-width-full"
                                    onClick={closeModal}
                                >
                                    Continue
                                </Button>
                            </div>
                        </Sheet>
                    </div>
                }
            </FieldRow>
        )
    })
}

const SignInForm = (props) => {
    const {
        // redux-form
        handleSubmit,
        error,
        submitting,
        // props from parent
        fields,
        submitText,
        forgotPassword,
        submitForm,
        disabled,
        // Handlers
        openModal,
        closeModal,
        modalOpen
    } = props

    return (
        <form
            noValidate={true}
            onSubmit={handleSubmit((values) =>
                new Promise((resolve, reject) => {
                    submitForm(values, resolve, reject)
                })
            )}
        >
            {error &&
                <div className="u-margin-bottom-md u-color-error">
                    {error}
                </div>
            }

            <FieldSet className="t-login__signin-fieldset">
                {renderFields(fields, forgotPassword, openModal, closeModal, modalOpen)}

                <FieldRow>
                    <Button
                        className="c--primary u-width-full"
                        type="submit"
                        disabled={submitting || disabled}
                    >
                        <span className="u-text-uppercase">{submitText || 'Login'}</span>
                    </Button>
                </FieldRow>
            </FieldSet>
        </form>
    )
}

SignInForm.propTypes = {
    closeModal: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    fields: PropTypes.array,
    forgotPassword: PropTypes.object,
    handleSubmit: PropTypes.func,
    href: PropTypes.string,
    invalid: PropTypes.bool,
    modalOpen: PropTypes.bool,
    openModal: PropTypes.func,
    submitForm: PropTypes.func,
    submitText: PropTypes.string,
    submitting: PropTypes.bool,
}


const ReduxSignInForm = reduxForm({
    form: 'signin-form'
})(SignInForm)

const mapStateToProps = createStructuredSelector({
    modalOpen: selectors.getSigninInfoModalOpen
})

export default connect(mapStateToProps)(ReduxSignInForm)
