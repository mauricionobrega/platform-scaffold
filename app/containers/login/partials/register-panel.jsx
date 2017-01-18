import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectorToJS} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {REGISTER_SECTION} from '../constants'

import RegisterForm from './register-form'
import {PanelHeading, PanelDescription, PanelRequiredText} from './common'

class RegisterPanel extends React.Component {
    constructor(props) {
        super(props)

        this.openRegisterModal = this.openRegisterModal.bind(this)
        this.closeRegisterModal = this.closeRegisterModal.bind(this)
    }

    openRegisterModal() {
        this.props.openInfoModal(REGISTER_SECTION)
    }

    closeRegisterModal() {
        this.props.closeInfoModal(REGISTER_SECTION)
    }

    render() {
        const {
            registerSection,
            submitRegisterForm
        } = this.props

        const {
            heading,
            description,
            requiredText,
            form,
            infoModalOpen
        } = registerSection

        return (
            <div className="t-login__register-panel">
                <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                    <PanelHeading heading={heading} />
                    <PanelDescription description={description} />
                    <div className="u-margin-top">
                        <PanelRequiredText requiredText={requiredText} />
                    </div>
                </div>

                <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                    <RegisterForm {...form}
                        disabled={!form.href}
                        submitForm={submitRegisterForm}
                        openModal={this.openRegisterModal}
                        closeModal={this.closeRegisterModal}
                        modalOpen={infoModalOpen}
                        />
                </div>
            </div>
        )
    }
}

RegisterPanel.propTypes = {
    closeInfoModal: PropTypes.func,
    openInfoModal: PropTypes.func,
    registerSection: PropTypes.object,
    submitRegisterForm: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    registerSection: selectorToJS(selectors.getRegisterSection)
})

const mapDispatchToProps = {
    submitRegisterForm: actions.submitRegisterForm,
    closeInfoModal: actions.closeInfoModal,
    openInfoModal: actions.openInfoModal
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPanel)
