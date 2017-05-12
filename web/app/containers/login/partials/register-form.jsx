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
import {REGISTER_SECTION} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'

import {LoginField} from './common'

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
            sections,
            submitText,
            href,
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

                {sections.map(({heading, fields}, idx) => {
                    return (
                        <FieldSet className="t-login__register-fieldset" key={idx}>
                            {fields.map((field, idx) =>
                                <LoginField {...field} key={idx} modalInfo={this.modalInfo} />
                            )}
                        </FieldSet>
                    )
                })}

                <Button
                    className="c--primary u-width-full u-margin-top-lg"
                    type="submit"
                    disabled={submitting || !href}
                >
                    <span className="u-text-uppercase">{submitText || 'Create an Account'}</span>
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
    modalOpen: PropTypes.bool,
    openInfoModal: PropTypes.func,
    sections: PropTypes.array,
    submitForm: PropTypes.func,
    submitText: PropTypes.string,
    submitting: PropTypes.bool,
}


const ReduxRegisterForm = reduxForm({
    form: 'register-form'
})(RegisterForm)

const mapStateToProps = createPropsSelector({
    sections: selectors.register.form.getSections,
    href: selectors.register.form.getHref,
    modalOpen: isModalOpen(REGISTER_SECTION),
    submitText: selectors.register.form.getSubmitText
})

const mapDispatchToProps = {
    closeInfoModal: () => closeModal(REGISTER_SECTION),
    openInfoModal: () => openModal(REGISTER_SECTION)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxRegisterForm)
