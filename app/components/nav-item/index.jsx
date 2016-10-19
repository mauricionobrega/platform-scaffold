import React from 'react'
import * as assetUtils from 'progressive-web-sdk/dist/asset-utils'
import * as DefaultNavItem from 'progressive-web-sdk/dist/components/nav-item'
import Link from 'progressive-web-sdk/dist/components/link'
import classNames from 'classnames'

/* eslint-disable react/prop-types */

// Linter is not smart enough to work out that props have been
// declared with a reference to the default component.

/**
 * Project-specific navitem - uses a `Link` instead of a `Button` in
 * order to allow react-router to handle navigation changes.
 */
export const NavItem = (props) => {
    const {
        navigate,
        selected,
        title,
        className,
        childIcon,
        beforeContent: beforeContentProp,
        content: contentProp,
        hasChild,
        path,
    } = props

    const before = beforeContentProp
    const content = contentProp || title
    const after = hasChild ? childIcon : null
    const classes = classNames('c-nav-item', className,
        {
            'c-nav-item--has-child': hasChild,
            'c-nav-item--selected': selected,
        }
    )

    return (
        <Link className={classes} href={path} onClick={navigate}>
            <div className="c-nav-item__inner">
                {before &&
                    <span className="c-nav-item__before">
                        {before}
                    </span>
                }

                <span className="c-nav-item__content">
                    {content}
                </span>

                {after &&
                    <span className="c-nav-item__after">
                        {after}
                    </span>
                }
            </div>
        </Link>
    )
}

NavItem.defaultProps = DefaultNavItem.defaultProps

NavItem.propTypes = DefaultNavItem.propTypes

/* eslint-enable react/prop-types */

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
            beforeContent={<NavItemIcon src={assetUtils.getAssetUrl('static/img/icon-account.svg')} />} />
    )
}

AccountNavItem.propTypes = NavItem.propTypes
