import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import {stripEvent} from '../../../utils/utils'
import {isModalOpen} from '../../../store/selectors'
import * as productDetailsActions from '../actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from '../constants'
import {closeModal} from '../../../store/modals/actions'

import Button from 'progressive-web-sdk/dist/components/button'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import ProductItem from '../../../components/product-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

<<<<<<< HEAD:web/app/containers/pdp/partials/pdp-item-added-modal.jsx
// calculates modal height based on user screen size 50% by default
let coverage = '50'
if (window.innerHeight < 370) {
    coverage = '70'
} else if (window.innerHeight < 460) {
    coverage = '56'
}

const ProductDetailsItemAddedModal = ({open, onDismiss, quantity, title, price, productImage, onGoToCheckout}) => (
    <Sheet open={open} onDismiss={onDismiss} effect="slide-bottom" className="product-list__item-added-modal" coverage="50%">
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
                <ProductItem
                    title={<h2 className="c-h4">{title}</h2>}
                    image={<img role="presentation" src={productImage} alt="" width="60px" />}
                >
                    <div className="u-flexbox u-justify-between u-padding-top-sm">
                        <p>Qty: {quantity}</p>
                        <p>{price}</p>
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
    productImage: PropTypes.string,
    quantity: PropTypes.number,
    title: PropTypes.string,
    onDismiss: PropTypes.func,
    onGoToCheckout: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
    productImage: selectors.getFirstProductImage,
    open: isModalOpen(PRODUCT_DETAILS_ITEM_ADDED_MODAL),
    quantity: selectors.getItemQuantity,
    title: selectors.getProductTitle,
    price: selectors.getProductPrice
})

const mapDispatchToProps = {
    onGoToCheckout: productDetailsActions.goToCheckout
    onDismiss: stripEvent(() => closeModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsItemAddedModal)
