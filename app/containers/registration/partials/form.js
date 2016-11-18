import React, {PropTypes} from 'react'
import {Field, reduxForm} from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldComponent from 'progressive-web-sdk/dist/components/field'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const RegistrationForm = (props) => {
    const {
        // redux-form
        handleSubmit,
        error,
        submitting,
        // props from parent
        sections,
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
            {sections.map(({heading, fields}, idx) => {
                return (
                    <FieldSet key={idx}>
                        {heading ?
                            <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">{heading}</h3>
                        :
                            <SkeletonBlock height="18px" width="50%" className="u-margin-bottom" />
                        }

                        {fields.map(({label, name, type, required, tooltip}, idx) => {
                            const labelNode = (
                                <span>
                                    {label}
                                    {required && <span> *</span>}
                                </span>
                            )
                            return (
                                <FieldRow key={idx}>
                                    <Field // Actually ReduxFormField from 'redux-form'
                                        name={name}
                                        label={labelNode}
                                        component={FieldComponent} // Progressive Web SDK Field Component
                                    >
                                        <input type={type} />
                                    </Field>

                                    {tooltip &&
                                    (<div>
                                        <a href="#remember-me" onClick={openModal}>{tooltip.title}</a>

                                        <Sheet
                                            className="t-login__remember-me-modal"
                                            open={modalOpen}
                                            onDismiss={closeModal}
                                            effect="slide-bottom"
                                            headerContent={
                                                <div className="u-width-full u-bg-color-brand u-color-neutral-10 u-flexbox">
                                                    <h1 className="u-flex u-padding-md u-h4 u-text-uppercase">
                                                        {label}
                                                    </h1>

                                                    <Button onClick={closeModal}>
                                                        <Icon name="close" />
                                                    </Button>
                                                </div>
                                            }
                                        >
                                            <div id="remember-me" className="u-padding-md">
                                                {tooltip.content}
                                            </div>

                                            <div className="t-login__remember-me-button">
                                                <Button className="c-button c--secondary u-text-uppercase u-margin-top-lg u-width-full" onClick={closeModal}>
                                                    Continue
                                                </Button>
                                            </div>
                                        </Sheet>
                                    </div>)
                                    }
                                </FieldRow>
                            )
                        })}
                    </FieldSet>
                )
            })}

            <button className="c-button c--primary u-width-full u-margin-top-lg u-text-uppercase" type="submit" disabled={submitting}>{submitText}</button>
        </form>
    )
}

RegistrationForm.propTypes = {
    closeModal: PropTypes.func,
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


const ReduxRegistrationForm = reduxForm({
    form: 'registration-form'
})(RegistrationForm)

export default ReduxRegistrationForm
