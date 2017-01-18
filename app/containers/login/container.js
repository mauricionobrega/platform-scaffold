import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router'

import SignInPanel from './partials/signin-panel'
import RegisterPanel from './partials/register-panel'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import * as actions from './actions'
import * as selectors from './selectors'
import {SIGN_IN_SECTION, REGISTER_SECTION, SECTION_NAMES, INDEX_FOR_SECTION, SECTION_FOR_INDEX} from './constants'

const Login = ({
    title,
    navigateToSection,
    route: {routeName},
    router,
    routes
}) => {

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
                    <RegisterPanel />
                </TabsPanel>
            </Tabs>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    title: selectors.getLoginTitle,
    loaded: selectors.getLoginLoaded
})

const mapDispatchToProps = {
    navigateToSection: actions.navigateToSection
}

Login.propTypes = {
    navigateToSection: PropTypes.func,
    route: PropTypes.object,
    router: PropTypes.object,
    routes: PropTypes.array,
    title: PropTypes.string
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login))
