import React, {PropTypes} from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import ProductItem from '../../../components/product-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const PDPItemAddedModal = ({open, onDismiss, quantity, product: {title, price, carouselItems}, coverage}) => (
    <Sheet open={open} onDismiss={onDismiss} effect="slide-bottom" className="t-plp__item-added-modal" coverage={coverage}>
        <div className="u-flex-none u-border-bottom">
            <div className="u-flexbox u-align-center">
                <h1 className="u-flex u-padding-lg u-h4 u-text-uppercase">
                    Product Added to Cart
                </h1>

                <div className="t-pdp__item-added-modal-close u-flexbox u-flex-none u-align-center u-justify-center">
                    <Button className="u-text-uppercase" onClick={onDismiss}>
                        <Icon name="close" title="Close" className="t-pdp__item-added-modal-icon" />
                    </Button>
                </div>
            </div>
        </div>

        <div className="u-flexbox u-column u-flex u-padding-md">
            <div className="u-flex u-margin-bottom-md">
                <ProductItem
                    title={<h2 className="c-h4">{title}</h2>}
                    image={<img role="presentation" src={carouselItems[0].img} alt="" width="60px" />}
                >
                    <div className="u-flexbox u-justify-between u-padding-top-sm">
                        <p>Qty: {quantity}</p>
                        <p>{price}</p>
                    </div>
                </ProductItem>
            </div>

            <div className="u-flex-none">
                <Button
                    href="#"
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

PDPItemAddedModal.propTypes = {
    coverage: PropTypes.string,
    open: PropTypes.bool,
    product: PropTypes.object,
    quantity: PropTypes.number,
    onDismiss: PropTypes.func,
}

export default PDPItemAddedModal
