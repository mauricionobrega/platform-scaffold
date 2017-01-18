import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectorToJS} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {SIGN_IN_SECTION} from '../constants'

import SignInForm from './signin-form'
import {PanelHeading, PanelDescription, PanelRequiredText} from './common'

class SignInPanel extends React.Component {
    constructor(props) {
        super(props)

        this.openSignInModal = this.openSignInModal.bind(this)
        this.closeSignInModal = this.closeSignInModal.bind(this)
    }

    openSignInModal() {
        this.props.openInfoModal(SIGN_IN_SECTION)
    }

    closeSignInModal() {
        this.props.closeInfoModal(SIGN_IN_SECTION)
    }

    render() {
        const {
            signinFormInfo,
            description,
            heading,
            requiredText,
            submitSignInForm,
            infoModalOpen
        } = this.props

        return (
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
                    <SignInForm {...signinFormInfo}
                        disabled={!signinFormInfo.href}
                        submitForm={submitSignInForm}
                        openModal={this.openSignInModal}
                        closeModal={this.closeSignInModal}
                        modalOpen={infoModalOpen}
                        />
                </div>
            </div>
        )
    }
}

SignInPanel.propTypes = {
    closeInfoModal: PropTypes.func,
    description: PropTypes.string,
    heading: PropTypes.string,
    infoModalOpen: PropTypes.bool,
    openInfoModal: PropTypes.func,
    requiredText: PropTypes.string,
    signinFormInfo: PropTypes.object,
    submitSignInForm: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    description: selectors.getSigninSectionDescription,
    heading: selectors.getSigninSectionHeading,
    infoModalOpen: selectors.getSigninInfoModalOpen,
    requiredText: selectors.getSigninSectionRequiredText,
    signinFormInfo: selectorToJS(selectors.getSigninFormInfo)
})

const mapDispatchToProps = {
    closeInfoModal: actions.closeInfoModal,
    openInfoModal: actions.openInfoModal,
    submitSignInForm: actions.submitSignInForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPanel)
