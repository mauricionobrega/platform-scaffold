import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import * as headerActions from './actions'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

class Header extends React.Component {
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll.bind(this))
    }

    handleScroll() {
        const {isCollapsed} = this.props.header.toJS()
        const headerHeight = 52

        if (window.pageYOffset > headerHeight && !isCollapsed) {
            this.props.shrinkHeader()
        }

        if (window.pageYOffset < headerHeight && isCollapsed) {
            this.props.expandHeader()
        }
    }

    render() {
        const {header} = this.props
        const {isCollapsed} = header.toJS()

        const innerButtonClassName = classnames('t-header__inner-button', {
            't--hide-label': isCollapsed
        })

        return (
            <header className="t-header">
                <HeaderBar className="t-header__bar">
                    <HeaderBarActions>
                        <Button id="header-navigation" className="u-padding-0" innerClassName={innerButtonClassName}>
                            <IconLabel label="Menu" iconName="menu" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>

                    <div className="t-header__placeholder" />

                    <div className="u-flex">
                        <HeaderBarTitle>
                            <span className="u-visually-hidden">Merlin's Potions</span>
                        </HeaderBarTitle>
                    </div>

                    <HeaderBarActions>
                        <Button className="u-padding-0" innerClassName={innerButtonClassName}>
                            <IconLabel label="Stores" iconName="location" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>

                    <HeaderBarActions>
                        <Button className="u-padding-0" innerClassName={innerButtonClassName}>
                            <IconLabel label="Cart" iconName="bag" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>
                </HeaderBar>
            </header>
        )
    }
}

Header.propTypes = {
    //
}

export const mapStateToProps = ({header}) => ({header})


export const mapDispatchToProps = (dispatch, props) => {
    return {
        shrinkHeader: () => dispatch(headerActions.shrinkHeader()),
        expandHeader: () => dispatch(headerActions.expandHeader())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
