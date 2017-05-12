/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {withRouter} from 'progressive-web-sdk/dist/routing'

import SignInPanel from './partials/signin-panel'
import RegisterPanel from './partials/register-panel'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import * as actions from './actions'
import * as selectors from './selectors'
import {
    SIGN_IN_SECTION,
    REGISTER_SECTION,
    SECTION_NAMES,
    INDEX_FOR_SECTION,
    SECTION_FOR_INDEX
} from './constants'

import * as AstroIntegration from '../../utils/astro-integration'

const LoginTitle = ({title}) => {
    if (title) {
        return (
            <h1 className="u-text-uppercase u-text-normal">
                {title}
            </h1>
        )
    } else {
        return (
            <div className="u-padding-md">
                <SkeletonBlock height="32px" width="50%" />
            </div>
        )
    }
}

LoginTitle.propTypes = {
    title: PropTypes.string
}

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.navigateToSection = this.navigateToSection.bind(this)
    }

    navigateToSection(index) {
        this.props.navigateToSection(
            this.props.router,
            this.props.routes,
            SECTION_FOR_INDEX[index]
        )
    }

    render() {
        const {
            title,
            route: {
                routeName
            },
        } = this.props

        if (!AstroIntegration.isRunningInAstro) {
            return (
                <div className="t-login">
                    <div className="u-bg-color-neutral-10 u-padding-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                        <LoginTitle title={title} />
                    </div>

                    <Tabs activeIndex={INDEX_FOR_SECTION[routeName]} className="t-login__navigation" onChange={this.navigateToSection}>
                        <TabsPanel title={SECTION_NAMES[SIGN_IN_SECTION]}>
                            <SignInPanel />
                        </TabsPanel>
                        <TabsPanel title={SECTION_NAMES[REGISTER_SECTION]}>
                            <RegisterPanel />
                        </TabsPanel>
                    </Tabs>
                </div>
            )
        } else if (routeName === SIGN_IN_SECTION) {
            return (
                <div className="t-login">
                    <SignInPanel />
                </div>
            )
        } else if (routeName === REGISTER_SECTION) {
            return (
                <div className="t-login">
                    <RegisterPanel />
                </div>
            )
        } else {
            console.log('route unsupported: ', routeName)
            return null
        }
    }
}

const mapStateToProps = createPropsSelector({
    title: selectors.getLoginTitle
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
