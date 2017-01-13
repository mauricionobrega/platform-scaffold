import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import throttle from 'lodash.throttle'
import classnames from 'classnames'
import {selectorToJS} from '../../utils/selector-utils'

import * as headerActions from './actions'
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
        const {isCollapsed} = this.props.header
        const newIsCollapsed = window.pageYOffset > headerHeight

        // Don't trigger the action unless things have changed
        if (newIsCollapsed !== isCollapsed) {
            this.props.toggleHeader(newIsCollapsed)
        }
    }

    render() {
        const {onMenuClick, onMiniCartClick} = this.props
        const {isCollapsed, itemCount} = this.props.header

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
                        <CartAction innerButtonClassName={innerButtonClassName} onClick={onMiniCartClick} itemCount={itemCount} />
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

const mapStateToProps = createStructuredSelector({
    header: selectorToJS(selectors.getHeader)
})

const mapDispatchToProps = {
    toggleHeader: headerActions.toggleHeader
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
