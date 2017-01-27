import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import * as actions from '../actions'

import SignInForm from './signin-form'
import {PanelHeading, PanelDescription, PanelRequiredText} from './common'

const SignInPanel = ({description, heading, requiredText, submitForm}) => (
    <div className="t-login__signin-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <div className="u-margin-bottom">
                <PanelHeading heading={heading} />
            </div>

            <PanelDescription description={description} />

            <div className="u-margin-top">
                <PanelRequiredText requiredText={requiredText} />
            </div>
        </div>

        <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <SignInForm submitForm={submitForm} />
        </div>
    </div>
)

SignInPanel.propTypes = {
    description: PropTypes.string,
    heading: PropTypes.string,
    requiredText: PropTypes.string,
    submitForm: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    description: selectors.getSigninSectionDescription,
    heading: selectors.getSigninSectionHeading,
    requiredText: selectors.getSigninSectionRequiredText
})

const mapDispatchToProps = {
    submitForm: actions.submitSignInForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPanel)
