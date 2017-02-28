import React from 'react'
import NavItem from 'progressive-web-sdk/dist/components/nav-item'
import Icon from 'progressive-web-sdk/dist/components/icon'

/**
 * Icon used on project-specific nav items
 */
const NavItemIcon = (props) => {
    const {name} = props
    return (
        <div className="c-nav-item__icon">
            <Icon className="c-nav-item__icon-content" name={name} />
        </div>
    )
}


NavItemIcon.propTypes = {
    name: React.PropTypes.string,
}


/**
 * Project-specific NavItem which displays an icon on the left.
 */
export const NavItemWithIcon = (props) => {
    return (
        <NavItem {...props} className="c--with-icon" />
    )
}

NavItemWithIcon.propTypes = NavItem.propTypes


/**
 * Project-specific NavItem which displays an account icon on the left.
 */
export const AccountNavItem = (props) => {
    return (
        <NavItemWithIcon {...props}
            beforeContent={<NavItemIcon name="user" />} />
    )
}

AccountNavItem.propTypes = NavItem.propTypes
