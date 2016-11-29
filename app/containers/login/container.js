import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import SignInForm from './partials/signin'
import RegisterForm from './partials/register'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import * as actions from './actions'

class Login extends React.Component {

    // a few constants to make refactoring easier in future
    static get SIGN_IN_SECTION() { return 'signin' }
    static get REGISTER_SECTION() { return 'register' }
    static get SECTION_NAMES() {
        return {
            [Login.SIGN_IN_SECTION]: 'Sign In',
            [Login.REGISTER_SECTION]: 'Register'
        }
    }

    indexForSection(sectionName) {
        return sectionName === Login.REGISTER_SECTION ? 1 : 0
    }

    sectionForIndex(activeIndex) {
        return activeIndex === 1 ? Login.REGISTER_SECTION : Login.SIGN_IN_SECTION
    }

    render() {
        const {
            title,
            signinSection,
            registerSection,
            submitSignInForm,
            submitRegisterForm,
            openInfoModal,
            closeInfoModal,
            navigateToSection,
            route: {routeName},
            router,
            routes
        } = this.props

        const openSignInModal = () => openInfoModal(Login.SIGN_IN_SECTION)
        const closeSignInModal = () => closeInfoModal(Login.SIGN_IN_SECTION)

        const openRegisterModal = () => openInfoModal(Login.REGISTER_SECTION)
        const closeRegisterModal = () => closeInfoModal(Login.REGISTER_SECTION)

        return (
            <div className="t-login">
                {title ?
                    <h1 className="u-text-uppercase u-text-normal u-padding-md u-bg-color-neutral-20">
                        {title}
                    </h1>
                :
                    <div className="u-padding-md">
                        <SkeletonBlock height="32px" width="50%" />
                    </div>
                }

                <Tabs activeIndex={this.indexForSection(routeName)} className="t-login__navigation" onChange={(index) => navigateToSection(router, routes, this.sectionForIndex(index))}>
                    <TabsPanel title={Login.SECTION_NAMES[Login.SIGN_IN_SECTION]}>
                        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                            {signinSection.heading ?
                                <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">
                                    {signinSection.heading}
                                </h3>
                            :
                                <SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />
                            }

                            {signinSection.description ?
                                <p>{signinSection.description}</p>
                            :
                                <SkeletonText lines={2} size="14px" width="100%" />
                            }

                            {signinSection.requiredText ?
                                <div className="u-margin-top">
                                    {signinSection.requiredText}
                                </div>
                            :
                                <SkeletonText lines={1} size="16px" width="33%" />
                            }
                        </div>

                        <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                            <SignInForm {...signinSection.form}
                                disabled={!signinSection.form.href}
                                submitForm={submitSignInForm}
                                openModal={openSignInModal}
                                closeModal={closeSignInModal}
                                modalOpen={signinSection.infoModalOpen}
                            />
                        </div>
                    </TabsPanel>

                    <TabsPanel title={Login.SECTION_NAMES[Login.REGISTER_SECTION]}>
                        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                            {registerSection.heading ?
                                <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">
                                    {registerSection.heading}
                                </h3>
                            :
                                <SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />
                            }

                            {registerSection.description ?
                                <p>{registerSection.description}</p>
                            :
                                <SkeletonText lines={2} size="14px" width="100%" />
                            }

                            {registerSection.requiredText ?
                                <div className="u-margin-top">
                                    {registerSection.requiredText}
                                </div>
                            :
                                <SkeletonText lines={1} size="16px" width="33%" />
                            }
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
                    </TabsPanel>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...state.login.toJS()
    }
}

const mapDispatchToProps = {
    submitSignInForm: actions.submitSignInForm,
    submitRegisterForm: actions.submitRegisterForm,
    navigateToSection: actions.navigateToSection,
    openInfoModal: actions.openInfoModal,
    closeInfoModal: actions.closeInfoModal
}

Login.propTypes = {
    closeInfoModal: PropTypes.func,
    navigateToSection: PropTypes.func,
    openInfoModal: PropTypes.func,
    registerSection: PropTypes.object,
    route: PropTypes.object,
    router: PropTypes.object,
    routes: PropTypes.array,
    signinSection: PropTypes.object,
    submitRegisterForm: PropTypes.func,
    submitSignInForm: PropTypes.func,
    title: PropTypes.string
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login))
