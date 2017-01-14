import React from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBarActions} from 'progressive-web-sdk/dist/components/header-bar'

const CartAction = ({innerButtonClassName, onClick, cartCounterBadge}) => (
    <HeaderBarActions>
        <Button className="u-position-relative" innerClassName={innerButtonClassName} onClick={onClick}>
            <IconLabel label="Cart" iconName="cart" iconSize="medium" />
            {cartCounterBadge}
        </Button>
    </HeaderBarActions>
)

export default CartAction
