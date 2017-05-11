/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Nav from 'progressive-web-sdk/dist/components/nav'
import NavMenu from 'progressive-web-sdk/dist/components/nav-menu'
import NavItem from 'progressive-web-sdk/dist/components/nav-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import IconLabelButton from '../../components/icon-label-button'
import * as merlinsNavItem from '../../components/nav-item'
import * as selectors from './selectors'
import {NAVIGATION_MODAL} from './constants'
import {signOut} from '../app/actions'
import {isModalOpen} from '../../store/selectors'
import {closeModal} from '../../store/modals/actions'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import {withRouter} from 'progressive-web-sdk/dist/routing'
import NavigationSocialIcons from './partials/navigation-social-icons'

const Navigation = (props) => {
    const {path, isOpen, root, closeNavigation, router, logoutAction} = props

    const onPathChange = (path) => {
        const url = new URL(path)
        // Path in the nav expected to be on this domain. React-router now only accepts
        // a path, instead of a full url.
        const routerPath = url.pathname + url.search + url.hash
        router.push(routerPath)
        closeNavigation()
    }

    /**
     * Factory function to create project-specific NavItems
     */
    const itemFactory = (type, props) => {
        switch (type) {
            case 'AccountNavItem':
                return <merlinsNavItem.AccountNavItem {...props} />
            case 'AccountLogoutNavItem':
                return (
                    <merlinsNavItem.NavItemWithOnClick
                        {...props}
                        onClick={() => {
                            logoutAction()
                            closeNavigation()
                        }}
                    />
                )
            default:
                return <NavItem {...props} />
        }
    }

    return (
        <Sheet className="t-navigation" open={isOpen} onDismiss={closeNavigation} maskOpacity={0.7} coverage="85%">
            <Nav root={root.title ? root : null} path={path} onPathChange={onPathChange}>
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                        <h2 className="t-navigation__title u-heading-family u-text-uppercase">
                            <span className="u-text-extra-lighter">Merlin&#39;s</span> Potions
                        </h2>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="close" label="close" onClick={closeNavigation} />
                    </HeaderBarActions>
                </HeaderBar>

                <NavMenu itemFactory={itemFactory} />

                <div>
                    <NavigationSocialIcons />
                    <div className="t-navigation__copyright u-padding-md">
                        <p>Copyright Merlin&#39;s Potions 2016. All rights reserved.</p>
                    </div>
                </div>
            </Nav>
        </Sheet>
    )
}


Navigation.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeNavigation: PropTypes.func,

    isOpen: PropTypes.bool,
    logoutAction: PropTypes.func,
    path: PropTypes.string,
    root: PropTypes.object,
    /**
     * The react-router router object.
     */
    router: PropTypes.object,
}


const mapStateToProps = createPropsSelector({
    path: selectors.getPath,
    isOpen: isModalOpen(NAVIGATION_MODAL),
    root: selectors.getNavigationRoot
})

const mapDispatchToProps = {
    closeNavigation: () => closeModal(NAVIGATION_MODAL),
    logoutAction: () => signOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))
