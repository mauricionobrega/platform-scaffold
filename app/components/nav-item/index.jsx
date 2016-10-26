import React from 'react'
import * as assetUtils from 'progressive-web-sdk/dist/asset-utils'
import NavItem from 'progressive-web-sdk/dist/components/nav-item'

/**
 * Icon used on project-specific nav items
 */
const NavItemIcon = (props) => {
    const {src} = props
    return (
        <div className="c-nav-item__icon">
            <img role="presentation" className="c-nav-item__icon-content" src={src} />
        </div>
    )
}


NavItemIcon.propTypes = {
    src: React.PropTypes.string,
}


/**
 * Project-specific NavItem which displays an icon on the left.
 */
export const NavItemWithIcon = (props) => {
    return (
        <NavItem {...props} className="c-nav-item--with-icon" />
    )
}

NavItemWithIcon.propTypes = NavItem.propTypes


/**
 * Project-specific NavItem which displays an account icon on the left.
 */
export const AccountNavItem = (props) => {
    return (
        <NavItemWithIcon {...props}
            beforeContent={<NavItemIcon src={assetUtils.getAssetUrl('static/svg/icon-account.svg')} />} />
    )
}

AccountNavItem.propTypes = NavItem.propTypes
