import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import {stripEvent} from '../../../utils/utils'
import {isModalOpen} from '../../../store/selectors'
import {PDP_ITEM_ADDED_MODAL} from '../constants'

import * as pdpActions from '../actions'
import {closeModal} from '../../../store/modals/actions'

import Button from 'progressive-web-sdk/dist/components/button'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import ProductItem from '../../../components/product-item'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const PDPItemAddedModal = ({open, onDismiss, quantity, title, price, productImage, coverage, onGoToCheckout}) => (
    <Sheet open={open} onDismiss={onDismiss} effect="slide-bottom" className="t-plp__item-added-modal" coverage={coverage}>

        {/* Modal header */}
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

PDPItemAddedModal.propTypes = {
    coverage: PropTypes.string,
    open: PropTypes.bool,
    price: PropTypes.string,
    productImage: PropTypes.string,
    quantity: PropTypes.number,
    onDismiss: PropTypes.func,
    onGoToCheckout: PropTypes.func,
    title: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    productImage: selectors.getFirstProductImage,
    open: isModalOpen(PDP_ITEM_ADDED_MODAL),
    quantity: selectors.getItemQuantity,
    title: selectors.getProductTitle,
    price: selectors.getProductPrice
})

const mapDispatchToProps = {
    onDismiss: stripEvent(() => closeModal(PDP_ITEM_ADDED_MODAL)),
    onGoToCheckout: pdpActions.goToCheckout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDPItemAddedModal)
