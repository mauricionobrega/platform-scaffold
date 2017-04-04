import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

import RegisterForm from './register-form'
import {PanelHeading} from './common'

const registerDescription = 'Creating an account has many benefits: check out faster, keep more than one address, track orders, and more'
const requiredText = '* Required Fields'

const RegisterPanel = ({submitForm}) => (
    <div className="t-login__register-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <PanelHeading heading="New Customers" />
            <p>
                {registerDescription}
            </p>
            <div className="u-margin-top">
                {requiredText}
            </div>
        </div>

        <div className="u-bg-color-neutral-10 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <RegisterForm submitForm={submitForm} />
        </div>
    </div>
)

RegisterPanel.propTypes = {
    submitForm: PropTypes.func
}

const mapDispatchToProps = {
    submitForm: actions.submitRegisterForm
}

export default connect(null, mapDispatchToProps)(RegisterPanel)
