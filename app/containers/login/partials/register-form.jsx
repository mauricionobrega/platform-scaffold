import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import {LoginField} from './common'

const renderFields = (fields, openModal, closeModal, modalOpen) => {
    return fields.map((field, idx) => <LoginField {...field} key={idx} modalInfo={{openModal, closeModal, modalOpen}} />)
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
