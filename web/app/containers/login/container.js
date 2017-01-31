import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import SignInForm from './partials/signin'
import RegisterForm from './partials/register'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import {isRunningInAstro} from '../../utils/astro-integration'

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
                {!isRunningInAstro &&
                <div className="u-bg-color-neutral-20 u-padding-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                    {title ?
                        <h1 className="u-text-uppercase u-text-normal">
                            {title}
                        </h1>
                    :
                        <div className="u-padding-md">
                            <SkeletonBlock height="32px" width="50%" />
                        </div>
                    }
                </div>
                }   

                <Tabs activeIndex={this.indexForSection(routeName)} className="t-login__navigation" onChange={(index) => navigateToSection(router, routes, this.sectionForIndex(index))}>
                    <TabsPanel title={Login.SECTION_NAMES[Login.SIGN_IN_SECTION]}>
                        <LoginSection signinSection={signinSection} submitSignInForm={submitSignInForm} openSignInModal={openSignInModal} closeSignInModal={closeSignInModal}/>
                    </TabsPanel>

                    <TabsPanel title={Login.SECTION_NAMES[Login.REGISTER_SECTION]}>
                        <RegisterSection registerSection={registerSection} submitRegisterForm={submitRegisterForm} openRegisterModal={openRegisterModal} closeRegisterModal={closeRegisterModal}/>
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

function RegisterSection(props) {
    const item =
    <div>
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            {props.registerSection.heading ?
                <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">
                    {props.registerSection.heading}
                </h3>
            :
                <SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />
            }

            {props.registerSection.description ?
                <p>{props.registerSection.description}</p>
            :
                <SkeletonText lines={3} size="14px" width="100%" />
            }

            <div className="u-margin-top">
                {props.registerSection.requiredText ?
                    props.registerSection.requiredText
                :
                    <SkeletonText lines={1} size="14px" width="33%" />
                }
            </div>
        </div>

        <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <RegisterForm {...props.registerSection.form}
                disabled={!props.registerSection.form.href}
                submitForm={props.submitRegisterForm}
                openModal={props.openRegisterModal}
                closeModal={props.closeRegisterModal}
                modalOpen={props.registerSection.infoModalOpen}
            />
        </div>
    </div>
    return item
}

function LoginSection(props) {
    const item =
    <div>
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <div className="u-margin-bottom">
                {props.signinSection.heading ?
                    <h2 className="u-h3 u-color-brand u-text-font-family u-text-normal">
                        {props.signinSection.heading}
                    </h2>
                :
                    <SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />
                }
            </div>

            {props.signinSection.description ?
                <p>{props.signinSection.description}</p>
            :
                <SkeletonText lines={2} size="14px" width="100%" />
            }

            <div className="u-margin-top">
                {props.signinSection.requiredText ?
                    props.signinSection.requiredText
                :
                    <SkeletonText lines={1} size="14px" width="33%" />
                }
            </div>
        </div>

        <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <SignInForm {...props.signinSection.form}
                disabled={!props.signinSection.form.href}
                submitForm={props.submitSignInForm}
                openModal={props.openSignInModal}
                closeModal={props.closeSignInModal}
                modalOpen={props.signinSection.infoModalOpen}
            />
        </div>
    </div>
    return item
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
