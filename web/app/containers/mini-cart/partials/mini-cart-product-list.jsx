/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import classNames from 'classnames'
import {getCartURL} from '../../app/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Image from 'progressive-web-sdk/dist/components/image'
import List from 'progressive-web-sdk/dist/components/list'
import ProductItem from '../../../components/product-item'

import * as selectors from '../../../store/cart/selectors'

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

const MiniCartProductList = ({items, orderTotal, cartURL}) => {
    return (
        <div className="u-padding-md">
            <Button href={cartURL} className="c--tertiary u-width-full u-margin-bottom u-text-capitalize">
                View and edit cart
            </Button>

            <List>
                {items.map(({product, itemPrice, linePrice, quantity}) =>
                    <ProductItem
                        className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                        title={<h2 className="u-h3">{product.name}</h2>}
                        price={itemPrice}
                        key={product.id}
                        image={<Image src={product.thumbnail.src} alt={product.thumbnail.alt} width="64px" height="64px" />}
                        >
                        <div>
                            <p className="u-margin-bottom-sm">Qty: {quantity}</p>
                            <p>Sub-Total: {linePrice}</p>
                        </div>
                    </ProductItem>
                )}
            </List>

            <div className={SUBTOTAL_CLASSES}>
                <div className="u-flex u-text-uppercase">Subtotal:</div>
                <div className="u-flex-none">{orderTotal}</div>
            </div>
        </div>
    )
}

MiniCartProductList.propTypes = {
    cartURL: PropTypes.string,
    items: PropTypes.array,
    orderTotal: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    cartURL: getCartURL,
    items: selectors.getCartItems,
    orderTotal: selectors.getOrderTotal
})

export default connect(mapStateToProps)(MiniCartProductList)
