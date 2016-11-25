import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {stripEvent} from '../../utils/utils'

import SignInForm from './partials/signin'
import RegisterForm from './partials/register'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import * as actions from './actions'

class Login extends React.Component {
    static get SIGN_IN_SECTION() { return 'signin' }
    static get REGISTER_SECTION() { return 'register' }

    static get sectionNames() {
        return {
            [Login.SIGN_IN_SECTION]: 'Sign In',
            [Login.REGISTER_SECTION]: 'Register'
        }
    }

    /**
     * @param {string} sectionName - Name of the section, values: 'register', 'signin'
     * @returns {number} - index to use
     */
    indexForSection(sectionName) {
        return sectionName === Login.REGISTER_SECTION ? 1 : 0
    }

    sectionForIndex(activeIndex) {
        return activeIndex === 1 ? Login.REGISTER_SECTION : Login.SIGN_IN_SECTION
    }

    findPathForRoute(routes, routeName) {
        const path = routes[0].childRoutes.find((route) => route.routeName === routeName).path
        return `/${path}`
    }

    navigateToSection(router, routes, sectionName) {
        router.push(this.findPathForRoute(routes, sectionName))
    }

    render() {
        const {
            title,
            signinSection,
            registerSection,
            infoModalOpen,
            submitSignInForm,
            submitRegisterForm,
            openInfoModal,
            closeInfoModal,
            route: {routeName},
            router,
            routes
        } = this.props

        return (
            <div className="t-login">
                {title ?
                    <h1 className="u-text-uppercase u-text-normal u-padding-md u-bg-color-neutral-20">{title}</h1>
                :
                    <div className="u-padding-md">
                        <SkeletonBlock height="28px" width="50%" />
                    </div>
                }

                <Tabs activeIndex={this.indexForSection(routeName)} className="t-login__navigation" onChange={(index) => this.navigateToSection(router, routes, this.sectionForIndex(index))}>
                    <TabsPanel title={Login.sectionNames[Login.SIGN_IN_SECTION]}>
                        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                            {signinSection.heading ?
                                <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">{signinSection.heading}</h3>
                            :
                                <SkeletonBlock height="18px" width="50%" className="u-margin-bottom" />
                            }

                            {signinSection.description ?
                                <p>{signinSection.description}</p>
                            :
                                <SkeletonBlock height="14px" width="100%" />
                            }
                            <div className="u-margin-top">{signinSection.requiredText}</div>
                        </div>

                        {signinSection.form.href ?
                            <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                                <SignInForm {...signinSection.form} submitForm={submitSignInForm} openModal={openInfoModal} closeModal={closeInfoModal} modalOpen={infoModalOpen} />
                            </div>
                        :
                            <SkeletonBlock height="200vw" width="100%" />
                        }
                    </TabsPanel>
                    <TabsPanel title={Login.sectionNames[Login.REGISTER_SECTION]}>
                        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                            {registerSection.heading ?
                                <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">{registerSection.heading}</h3>
                            :
                                <SkeletonBlock height="18px" width="50%" className="u-margin-bottom" />
                            }

                            {registerSection.description ?
                                <p>{registerSection.description}</p>
                            :
                                <SkeletonBlock height="14px" width="100%" />
                            }
                            <div className="u-margin-top">{registerSection.requiredText}</div>
                        </div>

                        {registerSection.form.href ?
                            <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                                <RegisterForm {...registerSection.form} submitForm={submitRegisterForm} openModal={openInfoModal} closeModal={closeInfoModal} modalOpen={infoModalOpen} />
                            </div>
                        :
                            <SkeletonBlock height="200vw" width="100%" />
                        }
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
    openInfoModal: stripEvent(actions.openInfoModal),
    closeInfoModal: stripEvent(actions.closeInfoModal)
}

Login.propTypes = {
    closeInfoModal: PropTypes.func,
    infoModalOpen: PropTypes.bool,
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
