/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {stripEvent} from '../../../utils/utils'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {getProductThumbnail, getProductTitle, getProductPrice} from '../../../store/products/selectors'
import * as productDetailsActions from '../actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from '../constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'

import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import ProductItem from '../../../components/product-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const ProductDetailsItemAddedModal = ({open, onDismiss, quantity, title, price, thumbnail, onGoToCheckout}) => (
    <Sheet open={open} onDismiss={onDismiss} effect="slide-bottom" className="t-product-details__item-added-modal" coverage="50%" shrinkToContent>
        {/* Modal header */}
        <div className="u-flex-none u-border-bottom">
            <div className="u-flexbox u-align-center">
                <h1 className="u-flex u-padding-lg u-h4 u-text-uppercase">
                    Product Added to Cart
                </h1>

                <div className="t-product-details__item-added-modal-close u-flexbox u-flex-none u-align-center u-justify-center">
                    <Button className="u-text-uppercase" onClick={onDismiss}>
                        <Icon name="close" title="Close" className="t-product-details__item-added-modal-icon" />
                    </Button>
                </div>
            </div>
        </div>

        <div className="u-flexbox u-column u-flex u-padding-md">
            {/* Modal product information */}
            <div className="u-flex u-margin-bottom-md">
                <ProductItem customWidth="20%"
                    title={<h2 className="u-h5 u-text-font-family u-text-semi-bold">{title}</h2>}
                    image={<img role="presentation" src={thumbnail.src} alt={thumbnail.alt} width="60px" />}
                >
                    <div className="u-flexbox u-justify-between u-padding-top-sm">
                        <p>Qty: {quantity}</p>
                        <p className="u-text-bold">{price}</p>
                    </div>
                </ProductItem>
            </div>

            {/* Buttons */}
            <div className="u-flex-none">
                <Button
                    onClick={onGoToCheckout}
                    className="c--primary u-width-full u-margin-bottom-md u-text-uppercase"
                    innerClassName="u-text-align-center">
                    Go To Checkout
                </Button>
                <Button className="c--tertiary u-width-full u-text-uppercase" onClick={onDismiss}>
                    Continue Shopping
                </Button>
            </div>
        </div>
    </Sheet>
)

ProductDetailsItemAddedModal.propTypes = {
    open: PropTypes.bool,
    price: PropTypes.string,
    quantity: PropTypes.number,
    thumbnail: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
    }),
    title: PropTypes.string,
    onDismiss: PropTypes.func,
    onGoToCheckout: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    thumbnail: getProductThumbnail,
    open: isModalOpen(PRODUCT_DETAILS_ITEM_ADDED_MODAL),
    quantity: selectors.getItemQuantity,
    title: getProductTitle,
    price: getProductPrice
})

const mapDispatchToProps = {
    onGoToCheckout: productDetailsActions.goToCheckout,
    onDismiss: stripEvent(() => closeModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsItemAddedModal)
