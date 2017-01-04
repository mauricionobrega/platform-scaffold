import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import throttle from 'lodash.throttle'
import classnames from 'classnames'
import * as headerActions from './actions'
import {IS_IN_ASTRO_APP} from '../app/constants'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import Link from 'progressive-web-sdk/dist/components/link'
import logo from '../../static/svg/logo.svg'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import Badge from 'progressive-web-sdk/dist/components/badge'

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
        window.addEventListener('scroll', this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
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
        if (this.props.isRunningInAstro) {
            return false
        }

        const {onMenuClick, onMiniCartClick} = this.props
        const {isCollapsed, cart} = this.props.header.toJS()
        const cartCounterBadge = generateCartCounterBadge(cart)

        const innerButtonClassName = classnames('t-header__inner-button', 'u-padding-0', {
            't--hide-label': isCollapsed
        })

        const linkClassName = classnames('t-header__link', {
            't--fade-sparkles': isCollapsed
        })

        return (
            <header className="t-header">
                <div className="t-header__bar">
                    <HeaderBar >
                        <HeaderBarActions>
                            <div role="navigation">
                                <Button id="header-navigation" innerClassName={innerButtonClassName} onClick={onMenuClick}>
                                    <IconLabel label="Menu" iconName="menu" iconSize="medium" />
                                </Button>
                            </div>
                        </HeaderBarActions>

                        <div className="t-header__placeholder" />

                        <div className="u-flex">
                            <HeaderBarTitle>
                                <Link href="/" className={linkClassName}>
                                    <DangerousHTML html={logo}>
                                        {(htmlObj) => <div className="t-header__logo" dangerouslySetInnerHTML={htmlObj} />}
                                    </DangerousHTML>
                                    <h1 className="u-visually-hidden">Merlin's Potions</h1>
                                </Link>
                            </HeaderBarTitle>
                        </div>

                        <HeaderBarActions>
                            <Button innerClassName={innerButtonClassName}>
                                <IconLabel label="Stores" iconName="map" iconSize="medium" />
                            </Button>
                        </HeaderBarActions>

                        <HeaderBarActions>
                            <Button className="u-position-relative" innerClassName={innerButtonClassName} onClick={onMiniCartClick}>
                                <IconLabel label="Cart" iconName="cart" iconSize="medium" />
                                {cartCounterBadge}
                            </Button>
                        </HeaderBarActions>
                    </HeaderBar>
                </div>
            </header>
        )
    }
}

Header.propTypes = {
    appState: PropTypes.object,
    header: PropTypes.object,
    isCollapsed: PropTypes.bool,
    isRunningInAstro: PropTypes.bool,
    toggleHeader: PropTypes.func,

    onMenuClick: PropTypes.func,
    onMiniCartClick: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        header: state.header,
        isRunningInAstro: state.app.get(IS_IN_ASTRO_APP)
    }
}

const mapDispatchToProps = {
    toggleHeader: headerActions.toggleHeader
}

export {Header as RawHeader}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
