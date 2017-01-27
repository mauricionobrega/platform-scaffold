import React, {PropTypes} from 'react'
import {Field, reduxForm} from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldComponent from 'progressive-web-sdk/dist/components/field'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const renderFields = (fields, openModal, closeModal, modalOpen) => {
    return fields.map(({label, name, type, required, tooltip}, idx) => {
        const labelNode = (
            <span>
                {label} {required && <span>*</span>}
            </span>
        )

        const headerContent = (
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
                            headerContent={headerContent}
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

const RegisterForm = (props) => {
    const {
        // redux-form
        handleSubmit,
        error,
        submitting,
        // props from parent
        sections,
        submitText,
        submitForm,
        disabled,
        // handlers
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

            {sections.map(({heading, fields}, idx) => {
                return (
                    <FieldSet className="t-login__register-fieldset" key={idx}>
                        <div className="u-margin-bottom">
                            {heading ?
                                <h3 className="u-color-brand u-text-font-family u-text-normal">
                                    {heading}
                                </h3>
                            :
                                <SkeletonBlock height="24px" width="50%" />
                            }
                        </div>

                        {renderFields(fields, openModal, closeModal, modalOpen)}
                    </FieldSet>
                )
            })}

            <Button
                className="c--primary u-width-full u-margin-top-lg"
                type="submit"
                disabled={submitting || disabled}
            >
                <span className="u-text-uppercase">{submitText || 'Create an Account'}</span>
            </Button>
        </form>
    )
}

RegisterForm.propTypes = {
    closeModal: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    href: PropTypes.string,
    invalid: PropTypes.bool,
    modalOpen: PropTypes.bool,
    openModal: PropTypes.func,
    sections: PropTypes.array,
    submitForm: PropTypes.func,
    submitText: PropTypes.string,
    submitting: PropTypes.bool,
}


const ReduxRegisterForm = reduxForm({
    form: 'register-form'
})(RegisterForm)

export default ReduxRegisterForm
