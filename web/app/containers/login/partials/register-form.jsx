import React, {PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectorToJS} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import {isModalOpen} from '../../../store/selectors'
import {openModal, closeModal} from '../../../store/modals/actions'
import {REGISTER_SECTION} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import FieldSet from 'progressive-web-sdk/dist/components/field-set'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

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

                            {fields.map((field, idx) =>
                                <LoginField {...field} key={idx} modalInfo={this.modalInfo} />
                            )}
                        </FieldSet>
                    )
                })}

                <Button
                    className="c--primary u-width-full u-margin-top-lg"
                    type="submit"
                    disabled={submitting || !isFormLoaded}
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
    isFormLoaded: PropTypes.bool,
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

const mapStateToProps = createStructuredSelector({
    sections: selectorToJS(selectors.register.form.getSections),
    isFormLoaded: selectors.register.getIsFormLoaded,
    modalOpen: isModalOpen(REGISTER_SECTION),
    submitText: selectors.register.form.getSubmitText
})

const mapDispatchToProps = {
    closeInfoModal: () => closeModal(REGISTER_SECTION),
    openInfoModal: () => openModal(REGISTER_SECTION)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxRegisterForm)
