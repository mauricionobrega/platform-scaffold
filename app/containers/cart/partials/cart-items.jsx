import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import * as miniCartSelectors from '../../mini-cart/selectors'
import classNames from 'classnames'
import {selectorToJS} from '../../../utils/selector-utils'

import {GridSpan} from '../../../components/grid'
import Button from 'progressive-web-sdk/dist/components/button'
import CartProductList from './cart-product-list'
import CartSummary from './cart-summary'

const CartItems = ({cart, openWishlistModal, openEstimateShippingModal}) => {
    const isCartEmpty = cart.items.length === 0
    const summaryClassnames = classNames('t-cart__summary-wrapper', {
        'u-visually-hidden': isCartEmpty,
        't--hide': isCartEmpty,
    })
    return (
        <div>
            <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                <CartProductList
                    cart={cart}
                    onSaveLater={openWishlistModal}
                    />
            </GridSpan>

            <GridSpan className={summaryClassnames} tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                <CartSummary
                    cart={cart}
                    onCalculateClick={openEstimateShippingModal}
                    />

                <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg">
                    <Button className="c--tertiary u-width-full u-text-uppercase">
                        Continue Shopping
                    </Button>
                </div>
            </GridSpan>
        </div>
    )
}

CartItems.propTypes = {
    cart: PropTypes.object,
    openEstimateShippingModal: PropTypes.func,
    openWishlistModal: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    cart: selectorToJS(miniCartSelectors.getCartObject)
})

export default connect(mapStateToProps)(CartItems)
