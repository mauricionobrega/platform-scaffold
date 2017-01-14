import React from 'react'

import Badge from 'progressive-web-sdk/dist/components/badge'
import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBarActions} from 'progressive-web-sdk/dist/components/header-bar'

const CartItemCounterBadge = ({itemCount}) => {
    if (itemCount > 0) {
        return (
            <Badge className="t-header__badge" title={`${itemCount} items in the cart`}>
                {itemCount}
            </Badge>
        )
    } else {
        return (
            <p className="u-visually-hidden">No items in the cart.</p>
        )
    }
}

const CartAction = ({innerButtonClassName, onClick, itemCount}) => (
    <HeaderBarActions>
        <Button className="u-position-relative" innerClassName={innerButtonClassName} onClick={onClick}>
            <IconLabel label="Cart" iconName="cart" iconSize="medium" />
            <CartItemCounterBadge itemCount={itemCount} />
        </Button>
    </HeaderBarActions>
)

export default CartAction
