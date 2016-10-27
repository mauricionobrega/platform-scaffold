import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import * as headerActions from './actions'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import Link from 'progressive-web-sdk/dist/components/button'

class Header extends React.Component {
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll.bind(this))
    }

    handleScroll() {
        const {isCollapsed} = this.props.header
        const headerHeight = 52

        if (window.pageYOffset > headerHeight && !isCollapsed) {
            this.props.shrinkHeader()
        }

        if (window.pageYOffset < headerHeight && isCollapsed) {
            this.props.expandHeader()
        }
    }

    render() {
        const {header, onMenuClick} = this.props
        const {isCollapsed} = header

        const innerButtonClassName = classnames('t-header__inner-button', 'u-padding-0', {
            't--hide-label': isCollapsed
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
                            <Link href="/" className="t-header__link">
                                <div className="t-header__logo"></div>
                                <h1 className="u-visually-hidden">Merlin's Potions</h1>
                            </Link>
                        </HeaderBarTitle>
                    </div>

                    <HeaderBarActions>
                        <Button innerClassName={innerButtonClassName}>
                            <IconLabel label="Stores" iconName="location" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>

                    <HeaderBarActions>
                        <Button innerClassName={innerButtonClassName}>
                            <IconLabel label="Cart" iconName="bag" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>
                </HeaderBar>
            </header>
        )
    }
}

Header.propTypes = {
    onMenuClick: PropTypes.func
}

export const mapStateToProps = ({header}) => {
    return {
        header: header.toJS()
    }
}


export const mapDispatchToProps = (dispatch) => {
    return {
        shrinkHeader: () => dispatch(headerActions.shrinkHeader()),
        expandHeader: () => dispatch(headerActions.expandHeader())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
