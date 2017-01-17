import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router'
import {selectorToJS} from '../../utils/selector-utils'

import SignInForm from './partials/signin-form'
import RegisterForm from './partials/register'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import * as actions from './actions'
import * as selectors from './selectors'
import {SIGN_IN_SECTION, REGISTER_SECTION, SECTION_NAMES, INDEX_FOR_SECTION, SECTION_FOR_INDEX} from './constants'

const Login = ({
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
}) => {

    const openSignInModal = () => openInfoModal(SIGN_IN_SECTION)
    const closeSignInModal = () => closeInfoModal(SIGN_IN_SECTION)

    const openRegisterModal = () => openInfoModal(REGISTER_SECTION)
    const closeRegisterModal = () => closeInfoModal(REGISTER_SECTION)

    return (
        <div className="t-login">
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

            <Tabs activeIndex={INDEX_FOR_SECTION[routeName]} className="t-login__navigation" onChange={(index) => navigateToSection(router, routes, SECTION_FOR_INDEX[index])}>
                <TabsPanel title={SECTION_NAMES[SIGN_IN_SECTION]}>
                    <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                        <div className="u-margin-bottom">
                            {signinSection.heading ?
                                <h2 className="u-h3 u-color-brand u-text-font-family u-text-normal">
                                    {signinSection.heading}
                                </h2>
                            :
                                <SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />
                            }
                        </div>

                        {signinSection.description ?
                            <p>{signinSection.description}</p>
                        :
                            <SkeletonText lines={2} size="14px" width="100%" />
                        }

                        <div className="u-margin-top">
                            {signinSection.requiredText ?
                                signinSection.requiredText
                            :
                                <SkeletonText lines={1} size="14px" width="33%" />
                            }
                        </div>
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

                <TabsPanel title={SECTION_NAMES[REGISTER_SECTION]}>
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
                            <SkeletonText lines={3} size="14px" width="100%" />
                        }

                        <div className="u-margin-top">
                            {registerSection.requiredText ?
                                registerSection.requiredText
                            :
                                <SkeletonText lines={1} size="14px" width="33%" />
                            }
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
                </TabsPanel>
            </Tabs>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    title: selectors.getLoginTitle,
    signinSection: selectorToJS(selectors.getSigninSection),
    registerSection: selectorToJS(selectors.getRegisterSection),
    loaded: selectors.getLoginLoaded
})

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
