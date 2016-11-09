import React, {PropTypes} from 'react'
import {Field, reduxForm} from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldComponent from 'progressive-web-sdk/dist/components/field'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const LoginForm = (props) => {
    const {
        // redux-form
        handleSubmit,
        error,
        submitting,
        // props from parent
        fields,
        submitText,
        submitForm,
        openModal,
        closeModal,
        modalOpen
    } = props
    return (
        <form
            onSubmit={handleSubmit((values) => {
                return new Promise((resolve, reject) => {
                    submitForm(values, resolve, reject)
                })
            })}
            noValidate={true}
        >
            {error && <div className="u-margin-bottom-md u-color-error">{error}</div>}
            <FieldSet>
                {fields.map(({label, name, type, required, tooltip}, idx) => {
                    return (
                        <FieldRow key={idx}>
                            <Field // Actually ReduxFormField from 'redux-form'
                                name={name}
                                label={label}
                                component={FieldComponent} // Progressive Web SDK Field Component
                            >
                                <input type={type} />
                            </Field>
                            {required && <span>*</span>}
                            {tooltip &&
                                (<div>
                                    <span onClick={openModal}>{tooltip.title}</span>
                                    <Sheet open={modalOpen} onDismiss={closeModal} effect="slide-bottom" className="">
                                        <Button onClick={closeModal}>Close</Button>
                                        {tooltip.content}
                                    </Sheet>
                                </div>)
                            }

                        </FieldRow>
                    )
                })}
            </FieldSet>
            <button className="c-button c--primary u-width-full u-margin-top-lg" type="submit" disabled={submitting}>{submitText}</button>
        </form>
    )
}

LoginForm.propTypes = {
    closeModal: PropTypes.func,
    error: PropTypes.string,
    fields: PropTypes.array,
    handleSubmit: PropTypes.func,
    href: PropTypes.string,
    invalid: PropTypes.bool,
    modalOpen: PropTypes.bool,
    openModal: PropTypes.func,
    submitForm: PropTypes.func,
    submitText: PropTypes.string,
    submitting: PropTypes.bool,
}


const ReduxLoginForm = reduxForm({
    form: 'login-form'
})(LoginForm)

export default ReduxLoginForm
