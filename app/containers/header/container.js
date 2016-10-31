import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import throttle from 'lodash.throttle'
import classnames from 'classnames'
import * as headerActions from './actions'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import Link from 'progressive-web-sdk/dist/components/link'
import logo from '../../static/svg/logo.svg'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'


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
        const isCloseToTop = window.pageYOffset < headerHeight && isCollapsed
        const hasScrolledDown = window.pageYOffset > headerHeight && !isCollapsed

        if (isCloseToTop || hasScrolledDown) {
            this.props.toggleHeader(!isCollapsed)
        }
    }

    render() {
        const {onMenuClick} = this.props
        const {isCollapsed} = this.props.header.toJS()

        const innerButtonClassName = classnames('t-header__inner-button', 'u-padding-0', {
            't--hide-label': isCollapsed
        })

        const linkClassName = classnames('t-header__link', {
            't--fade-sparkles': isCollapsed
        })

        return (
            <header className="t-header">
                <HeaderBar className="t-header__bar">
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
                        <Button innerClassName={innerButtonClassName}>
                            <IconLabel label="Cart" iconName="cart" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>
                </HeaderBar>
            </header>
        )
    }
}

Header.propTypes = {
    header: PropTypes.object,
    isCollapsed: PropTypes.bool,
    toggleHeader: PropTypes.func,
    onMenuClick: PropTypes.func,
}

export const mapStateToProps = ({header}) => {
    return {
        header
    }
}

export default connect(
    mapStateToProps,
    {
        toggleHeader: headerActions.toggleHeader
    }
)(Header)
