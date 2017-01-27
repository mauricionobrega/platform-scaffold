import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Badge from 'progressive-web-sdk/dist/components/badge'
import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBarActions} from 'progressive-web-sdk/dist/components/header-bar'
import * as selectors from '../selectors'

const CartItemCounterBadge = ({itemCount}) => {
    // `undefined` is not greater than 0
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

CartItemCounterBadge.propTypes = {
    itemCount: PropTypes.number
}

const CartAction = ({innerButtonClassName, onClick, itemCount}) => (
    <HeaderBarActions>
        <Button className="u-position-relative" innerClassName={innerButtonClassName} onClick={onClick}>
            <IconLabel label="Cart" iconName="cart" iconSize="medium" />
            <CartItemCounterBadge itemCount={itemCount} />
        </Button>
    </HeaderBarActions>
)

CartAction.propTypes = {
    innerButtonClassName: PropTypes.string,
    itemCount: PropTypes.number,
    onClick: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    itemCount: selectors.getItemCount
})

export default connect(mapStateToProps)(CartAction)
