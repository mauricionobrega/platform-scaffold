import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import classNames from 'classnames'

import {getCartHasItems} from '../../../store/cart/selectors'
import {GridSpan} from '../../../components/grid'
import Button from 'progressive-web-sdk/dist/components/button'
import CartProductList from './cart-product-list'
import CartSummary from './cart-summary'

const CartItems = ({hasItems}) => {
    const summaryClassnames = classNames('t-cart__summary-wrapper', {
        'u-visually-hidden': !hasItems,
        't--hide': !hasItems,
    })
    return (
        <div>
            <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                <CartProductList />
            </GridSpan>

            <GridSpan className={summaryClassnames} tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                <CartSummary />

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
    hasItems: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
    hasItems: getCartHasItems
})

export default connect(mapStateToProps)(CartItems)
