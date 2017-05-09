/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import IconLabelButton from '../../../components/icon-label-button'

const MiniCartHeader = ({closeMiniCart}) => (
    <HeaderBar>
        <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
            <h2 className="t-mini-cart__title u-text-header-font-family u-text-uppercase">
                <span className="u-text-extra-light">Shopping</span> Cart
            </h2>
        </HeaderBarTitle>

        <HeaderBarActions>
            <IconLabelButton iconName="close" label="close" onClick={closeMiniCart}>Close</IconLabelButton>
        </HeaderBarActions>
    </HeaderBar>
)

MiniCartHeader.propTypes = {
    closeMiniCart: PropTypes.func
}

export default MiniCartHeader
