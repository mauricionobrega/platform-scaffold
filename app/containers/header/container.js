import React from 'react'
import {connect} from 'react-redux'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

const Header = (props) => {
    return (
        <header className="t-header">
            <HeaderBar>
                <HeaderBarActions>
                    <Button id="header-navigation" className="u-padding-0">
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
                    <Button className="u-padding-0">
                        <IconLabel label="Stores" iconName="map" iconSize="medium" />
                    </Button>
                </HeaderBarActions>

                <HeaderBarActions>
                    <Button className="u-padding-0">
                        <IconLabel label="Cart" iconName="bag" iconSize="medium" />
                    </Button>
                </HeaderBarActions>
            </HeaderBar>
        </header>
    )
}

Header.propTypes = {
    //
}

export const mapStateToProps = (state) => {
    return {
        footer: state.footer,
    }
}

export default connect(
    mapStateToProps
)(Header)
