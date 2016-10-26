import React from 'react'
import {connect} from 'react-redux'
import Nav from 'progressive-web-sdk/dist/components/nav'
import NavMenu from 'progressive-web-sdk/dist/components/nav-menu'
import NavItem from 'progressive-web-sdk/dist/components/nav-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Image from 'progressive-web-sdk/dist/components/image'
import * as navActions from './actions'
import * as assetUtils from 'progressive-web-sdk/dist/asset-utils'
import IconTextButton from '../../components/icon-text-button'
import * as merlinsNavItem from '../../components/nav-item'


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
    const logoURL = assetUtils.getAssetUrl('static/img/logo.svg')
    const closeIconURL = assetUtils.getAssetUrl('static/img/icon-close.svg')

    const onPathChange = (path) => {
        history.push(path)
        closeNavigation()
    }

    return (
        <Sheet open={isOpen} onDismiss={closeNavigation}>
            <Nav root={root} path={path} onPathChange={onPathChange}>
                <div className="t-navigation__header">
                    <Image className="t-navigation__header-logo" src={logoURL} alt="Merlin's Potions" />
                    <IconTextButton iconURL={closeIconURL} text="close" onClick={closeNavigation} />
                </div>
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
