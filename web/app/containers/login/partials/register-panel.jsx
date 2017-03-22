import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import * as actions from '../actions'

import RegisterForm from './register-form'
import {PanelHeading, PanelDescription, PanelRequiredText} from './common'

const RegisterPanel = ({heading, description, requiredText, submitForm}) => (
    <div className="t-login__register-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <PanelHeading heading={heading} />
            <PanelDescription description={description} />
            <div className="u-margin-top">
                <PanelRequiredText requiredText={requiredText} />
            </div>
        </div>

        <div className="u-bg-color-neutral-10 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <RegisterForm submitForm={submitForm} />
        </div>
    </div>
)

RegisterPanel.propTypes = {
    description: PropTypes.string,
    heading: PropTypes.string,
    requiredText: PropTypes.string,
    submitForm: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    description: selectors.register.getDescription,
    heading: selectors.register.getHeading,
    requiredText: selectors.register.getRequiredText
})

const mapDispatchToProps = {
    submitForm: actions.submitRegisterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPanel)
