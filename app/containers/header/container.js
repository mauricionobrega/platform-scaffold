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

import NavigationAction from './partials/navigation-action'
import HeaderTitle from './partials/header-title'
import StoresAction from './partials/stores-action'
import CartAction from './partials/cart-action'

const HEADER_HEIGHT = 52
const SCROLL_CHECK_INTERVAL = 200

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.handleScroll = throttle(this.handleScroll.bind(this), SCROLL_CHECK_INTERVAL)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const {isCollapsed} = this.props.header.toJS()
        const newIsCollapsed = window.pageYOffset > HEADER_HEIGHT

        // Don't trigger the action unless things have changed
        if (newIsCollapsed !== isCollapsed) {
            this.props.toggleHeader(newIsCollapsed)
        }
    }

    render() {
        const {onMenuClick, onMiniCartClick} = this.props
        const {isCollapsed, itemCount} = this.props.header.toJS()

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
