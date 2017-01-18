import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectorToJS} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {REGISTER_SECTION} from '../constants'

import RegisterForm from './register-form'
import {PanelHeading, PanelDescription, PanelRequiredText} from './common'

const RegisterPanel = ({registerSection, submitRegisterForm, openRegisterModal, closeRegisterModal}) => (
    <div className="t-login__register-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <PanelHeading heading={registerSection.heading} />
            <PanelDescription description={registerSection.description} />
            <div className="u-margin-top">
                <PanelRequiredText requiredText={registerSection.requiredText} />
            </div>
        </div>

        <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <RegisterForm {...registerSection.form}
                disabled={!registerSection.form.href}
                submitForm={submitRegisterForm}
                openModal={openRegisterModal}
                closeModal={closeRegisterModal}
                modalOpen={registerSection.infoModalOpen}
                />
        </div>
    </div>
)

RegisterPanel.propTypes = {
    closeRegisterModal: PropTypes.func,
    openRegisterModal: PropTypes.func,
    registerSection: PropTypes.object,
    submitRegisterForm: PropTypes.func
}

export default RegisterPanel
