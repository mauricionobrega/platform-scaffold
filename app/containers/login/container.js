import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router'
import {selectorToJS} from '../../utils/selector-utils'

import SignInPanel from './partials/signin-panel'
import RegisterPanel from './partials/register-panel'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import * as actions from './actions'
import * as selectors from './selectors'
import {SIGN_IN_SECTION, REGISTER_SECTION, SECTION_NAMES, INDEX_FOR_SECTION, SECTION_FOR_INDEX} from './constants'

const Login = ({
    title,
    registerSection,
    submitRegisterForm,
    openInfoModal,
    closeInfoModal,
    navigateToSection,
    route: {routeName},
    router,
    routes
}) => {

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
                    <SignInPanel />
                </TabsPanel>
                <TabsPanel title={SECTION_NAMES[REGISTER_SECTION]}>
                    <RegisterPanel registerSection={registerSection} openRegisterModal={openRegisterModal} closeRegisterModal={closeRegisterModal} submitRegisterForm={submitRegisterForm} />
                </TabsPanel>
            </Tabs>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    title: selectors.getLoginTitle,
    registerSection: selectorToJS(selectors.getRegisterSection),
    loaded: selectors.getLoginLoaded
})

const mapDispatchToProps = {
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
    submitRegisterForm: PropTypes.func,
    title: PropTypes.string
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login))
