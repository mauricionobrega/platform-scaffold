/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'
import List from 'progressive-web-sdk/dist/components/list'
import ProductItem from '../../../components/product-item'

import * as selectors from '../../../store/cart/selectors'

// Parses strings in the format: $Dollars.Cents
// Dollar amounts only, cents must be specified.
export const productSubtotal = (price, quantity) => {
    const priceInCents = price.replace(/[$,. ]/g, '')
    const priceNumber = parseFloat(priceInCents) / 100
    return (priceNumber * quantity).toFixed(2)
}

const SUBTOTAL_CLASSES = classNames(
    't-mini-cart__subtotal',

    'u-flexbox',
    'u-justify-between',
    'u-margin-bottom-lg',
    'u-padding-top-lg',

    'u-h4',
    'u-heading-family'
)

/* eslint-disable camelcase */

const MiniCartProductList = ({items, subtotal}) => {
    return (
        <div className="u-padding-md">
            <Button href="/checkout/cart/" className="c--tertiary u-width-full u-margin-bottom u-text-capitalize">
                View and edit cart
            </Button>

            <List>
                {items.map(({product_name, product_price, qty, product_image, product_url}) =>
                    <ProductItem
                        className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                        title={<h2 className="u-h3">{product_name}</h2>}
                        price={product_price}
                        key={product_url}
                        image={<Image src={product_image.src} alt={product_image.alt} width="64px" height="64px" />}
                        >
                        <div>
                            <p className="u-margin-bottom-sm">Qty: {qty}</p>
                            <p>Sub-Total: ${productSubtotal(product_price, qty)}</p>
                        </div>
                    </ProductItem>
                )}
            </List>

            <div className={SUBTOTAL_CLASSES}>
                <div className="u-flex u-text-uppercase">Subtotal:</div>
                <div className="u-flex-none">{subtotal}</div>
            </div>
        </div>
    )
}

MiniCartProductList.propTypes = {
    items: PropTypes.array,
    subtotal: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    items: selectors.getCartItems,
    subtotal: selectors.getCartSubtotal
})

export default connect(mapStateToProps)(MiniCartProductList)
