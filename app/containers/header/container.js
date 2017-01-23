import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import throttle from 'lodash.throttle'
import classnames from 'classnames'

import * as headerActions from './actions'
import * as miniCartActions from '../mini-cart/actions'
import * as navActions from '../../containers/navigation/actions'
import * as selectors from './selectors'

import {HeaderBar} from 'progressive-web-sdk/dist/components/header-bar'

import NavigationAction from './partials/navigation-action'
import HeaderTitle from './partials/header-title'
import StoresAction from './partials/stores-action'
import CartAction from './partials/cart-action'

const SCROLL_CHECK_INTERVAL = 200

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.handleScroll = throttle(this.handleScroll.bind(this), SCROLL_CHECK_INTERVAL)
        // Start off uncollapsed
        this.headerHeight = Number.MAX_VALUE
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const {isCollapsed} = this.props
        const newIsCollapsed = window.pageYOffset > this.headerHeight

        // Don't trigger the action unless things have changed
        if (newIsCollapsed !== isCollapsed) {
            this.props.toggleHeader(newIsCollapsed)
        }
    }

    render() {
        const {onMenuClick, onMiniCartClick, isCollapsed} = this.props

        const innerButtonClassName = classnames('t-header__inner-button', 'u-padding-0', {
            't--hide-label': isCollapsed
        })

        return (
            <header className="t-header" ref={(el) => { this.headerHeight = el ? el.scrollHeight : Number.MAX_VALUE }}>
                <div className="t-header__bar">
                    <HeaderBar>
                        <NavigationAction innerButtonClassName={innerButtonClassName} onClick={onMenuClick} />
                        <div className="t-header__placeholder" />
                        <HeaderTitle isCollapsed={isCollapsed} />
                        <StoresAction innerButtonClassName={innerButtonClassName} />
                        <CartAction innerButtonClassName={innerButtonClassName} onClick={onMiniCartClick} />
                    </HeaderBar>
                </div>
            </header>
        )
    }
}

Header.propTypes = {
    isCollapsed: PropTypes.bool,
    toggleHeader: PropTypes.func,

    onMenuClick: PropTypes.func,
    onMiniCartClick: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    isCollapsed: selectors.getIsCollapsed
})

const mapDispatchToProps = {
    onMenuClick: navActions.openNavigation,
    onMiniCartClick: miniCartActions.requestOpenMiniCart,
    toggleHeader: headerActions.toggleHeader
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
