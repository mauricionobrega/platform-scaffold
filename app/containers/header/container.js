import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import throttle from 'lodash.throttle'
import classnames from 'classnames'
import * as headerActions from './actions'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import Link from 'progressive-web-sdk/dist/components/link'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import Badge from 'progressive-web-sdk/dist/components/badge'

import NavigationAction from './partials/navigation-action'
import HeaderTitle from './partials/header-title'
import StoresAction from './partials/stores-action'
import CartAction from './partials/cart-action'

export const generateCartCounterBadge = (cartContents) => {
    if (cartContents && cartContents.summary_count && cartContents.summary_count > 0) {
        return (
            <Badge className="t-header__badge" title={`${cartContents.summary_count} items in the cart`}>
                {cartContents.summary_count}
            </Badge>
        )
    } else {
        return (
            <p className="u-visually-hidden">No items in the cart.</p>
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.handleScroll = throttle(this.handleScroll.bind(this), 200)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const {isCollapsed} = this.props.header.toJS()
        const headerHeight = 52
        const newIsCollapsed = window.pageYOffset > headerHeight

        if (newIsCollapsed !== isCollapsed) {  // Saves triggering the action
            this.props.toggleHeader(newIsCollapsed)
        }
    }

    render() {
        const {onMenuClick, onMiniCartClick} = this.props
        const {isCollapsed, cart} = this.props.header.toJS()
        const cartCounterBadge = generateCartCounterBadge(cart)

        const innerButtonClassName = classnames('t-header__inner-button', 'u-padding-0', {
            't--hide-label': isCollapsed
        })

        return (
            <header className="t-header">
                <div className="t-header__bar">
                    <HeaderBar>
                        <NavigationAction innerButtonClassName={innerButtonClassName} onClick={onMenuClick} />
                        <div className="t-header__placeholder" />
                        <HeaderTitle isCollapsed={isCollapsed} />
                        <StoresAction innerButtonClassName={innerButtonClassName} />
                        <CartAction innerButtonClassName={innerButtonClassName} onClick={onMiniCartClick} cartCounterBadge={cartCounterBadge} />
                    </HeaderBar>
                </div>
            </header>
        )
    }
}

Header.propTypes = {
    header: PropTypes.object,
    toggleHeader: PropTypes.func,

    onMenuClick: PropTypes.func,
    onMiniCartClick: PropTypes.func,
}

const mapStateToProps = (state, props) => {
    return {
        header: state.header
    }
}

const mapDispatchToProps = {
    toggleHeader: headerActions.toggleHeader
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
