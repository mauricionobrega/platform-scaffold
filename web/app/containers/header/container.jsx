import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import throttle from 'lodash.throttle'
import classnames from 'classnames'

import * as headerActions from './actions'
import * as miniCartActions from '../mini-cart/actions'
import {openModal} from '../../store/modals/actions'
import {NAVIGATION_MODAL} from '../navigation/constants'
import * as selectors from './selectors'
import {getCartSummaryCount} from '../../store/cart/selectors'

import {HeaderBar} from 'progressive-web-sdk/dist/components/header-bar'

import NavigationAction from './partials/navigation-action'
import HeaderTitle from './partials/header-title'
import StoresAction from './partials/stores-action'
import CartAction from './partials/cart-action'

import {isRunningInAstro, trigger} from '../../utils/astro-integration'

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
        const {onMenuClick, onMiniCartClick, isCollapsed, itemCount} = this.props

        if (isRunningInAstro) {
            trigger('cart:count-updated', {
                count: itemCount
            })
            return null
        }

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
    itemCount: PropTypes.number,
    toggleHeader: PropTypes.func,
    onMenuClick: PropTypes.func,
    onMiniCartClick: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    isCollapsed: selectors.getIsCollapsed,
    itemCount: getCartSummaryCount
})

const mapDispatchToProps = {
    onMenuClick: () => openModal(NAVIGATION_MODAL),
    onMiniCartClick: miniCartActions.requestOpenMiniCart,
    toggleHeader: headerActions.toggleHeader
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
