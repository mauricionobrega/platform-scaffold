import React, {PropTypes} from 'react'
import Button from 'progressive-web-sdk/dist/components/button'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const PDPItemAddedModal = ({open, onDismiss, quantity, product: {title, price, carouselItems}}) => (
    <Sheet open={open} onDismiss={onDismiss} effect="slide-bottom" className="t-plp__item-added-modal">
        <div className="u-border-bottom">
            <div className="u-flexbox u-align-center">
                <h1 className="u-h3 u-flex u-padding-lg">
                    Product Added to Cart
                </h1>

                <div className="t-pdp__item-added-modal-close u-flexbox u-flex-none u-align-center u-justify-center">
                    <Button className="u-text-uppercase" onClick={onDismiss}>
                        <Icon name="close" title="Close" className="t-pdp__item-added-modal-icon" />
                    </Button>
                </div>
            </div>
        </div>

        <div className="u-padding-md">

            <div className="u-margin-bottom-md">
                <img role="presentation" src={carouselItems[0].img} />
                <p>category</p>
                <h1>{title}</h1>
                <h1>{price}</h1>
                <p>{quantity}</p>
            </div>

            <Button
                href="/checkout/cart"
                className="c--primary u-width-full u-margin-bottom-md u-text-uppercase"
                innerClassName="u-text-align-center">
                Go To Checkout
            </Button>

            <Button className="c--tertiary u-width-full u-text-uppercase" onClick={onDismiss}>
                Continue Shopping
            </Button>
        </div>
    </Sheet>
)

PDPItemAddedModal.propTypes = {
    open: PropTypes.bool,
    product: PropTypes.object,
    quantity: PropTypes.number,
    onDismiss: PropTypes.func
}

export default PDPItemAddedModal
