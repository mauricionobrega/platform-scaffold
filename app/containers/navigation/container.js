import React from 'react'
import {connect} from 'react-redux'
import Nav from 'progressive-web-sdk/dist/components/nav'
import NavMenu from 'progressive-web-sdk/dist/components/nav-menu'
import NavItem from 'progressive-web-sdk/dist/components/nav-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Image from 'progressive-web-sdk/dist/components/image'
import * as navActions from './actions'
import * as assetUtils from 'progressive-web-sdk/dist/asset-utils'
import IconLabelButton from '../../components/icon-label-button'
import * as merlinsNavItem from '../../components/nav-item'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import Link from 'progressive-web-sdk/dist/components/link'


/**
 * Factory function to create project-specific NavItems
 */
const itemFactory = (type, props) => {
    switch (type) {
        case 'AccountNavItem':
            return <merlinsNavItem.AccountNavItem {...props} />
        default:
            return <NavItem {...props} />
    }
}


const Navigation = (props) => {
    const {navigation, closeNavigation, history} = props
    const path = navigation.get('path')
    const isOpen = navigation.get('isOpen')
    const root = navigation.get('root') && navigation.get('root').toJS()
    const logoURL = assetUtils.getAssetUrl('static/svg/nav-logo.svg')

    const onPathChange = (path) => {
        history.push(path)
        closeNavigation()
    }

    return (
        <Sheet open={isOpen} onDismiss={closeNavigation} maskOpacity={0.85}>
            <Nav root={root} path={path} onPathChange={onPathChange}>
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start-sm u-text-align-start">
                        <Image className="t-navigation__header-logo" src={logoURL} alt="Merlin's Potions Logo" />
                        <h2 className="u-visually-hidden">Merlin's Main Navigation</h2>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="x" label="close" onClick={closeNavigation} />
                    </HeaderBarActions>
                </HeaderBar>

                <NavMenu itemFactory={itemFactory} />
            </Nav>
        </Sheet>
    )
}


Navigation.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeNavigation: React.PropTypes.func,

    /**
     * The react-router history object.
     */
    history: React.PropTypes.object,

    /**
     * The immutableJS data for the nav.
     */
    navigation: React.PropTypes.object,
}


export const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
    }
}


export default connect(
    mapStateToProps,
    {
        openNavigation: navActions.openNavigation,
        closeNavigation: navActions.closeNavigation,
    }
)(Navigation)
