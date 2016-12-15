import React from 'react'

import {HeaderBar, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

const CheckoutHeader = function(props) {
    return (
        <header className="t-checkout-header">
            <HeaderBar className="t-checkout-header__bar">
                <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                    <h2 className="t-checkout-header__title u-heading-family u-text-uppercase">
                        <span className="u-text-lighter">MERLIN'S</span> CHECKOUT
                    </h2>
                </HeaderBarTitle>
                <div className="t-checkout-header__icon-lock" />
            </HeaderBar>
        </header>
    )
}

export default CheckoutHeader
