import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectorToJS} from '../../../utils/selector-utils'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {SIGN_IN_SECTION} from '../constants'

import SignInForm from './signin-form'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const SignInPanelHeading = ({heading}) => {
    if (heading) {
        return (
            <h2 className="u-h3 u-color-brand u-text-font-family u-text-normal">
                {heading}
            </h2>
        )
    } else {
        return (<SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />)
    }
}

SignInPanelHeading.propTypes = {
    heading: PropTypes.string
}

const SignInPanelDescription = ({description}) => {
    if (description) {
        return (<p>{description}</p>)
    } else {
        return (<SkeletonText lines={2} size="14px" width="100%" />)
    }
}

SignInPanelDescription.propTypes = {
    description: PropTypes.string
}

const SignInPanelRequiredText = ({requiredText}) => {
    if (requiredText) {
        return (<span>{requiredText}</span>)
    } else {
        return (<SkeletonText lines={1} size="14px" width="33%" />)
    }
}

SignInPanelRequiredText.propTypes = {
    requiredText: PropTypes.string
}

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
                        <SignInPanelHeading heading={heading} />
                    </div>

                    <SignInPanelDescription description={description} />

                    <div className="u-margin-top">
                        <SignInPanelRequiredText requiredText={requiredText} />
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
