import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import {Grid, GridSpan} from '../../components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'

import * as actions from './actions'
import CartProductList from './partials/cart-product-list'
import CartSummary from './partials/cart-summary'
import CartEstimateShippingModal from './partials/cart-estimate-shipping'
import CartWishlistModal from './partials/cart-wishlist'

class Cart extends React.Component {
    constructor(props) {
        super(props)

        this.openEstimateShippingModal = this.openEstimateShippingModal.bind(this)
        this.closeEstimateShippingModal = this.closeEstimateShippingModal.bind(this)
        this.openWishlistModal = this.openWishlistModal.bind(this)
        this.closeWishlistModal = this.closeWishlistModal.bind(this)
    }

    shouldComponentUpdate(newProps) {
        const miniCartChanged = !Immutable.is(newProps.miniCart, this.props.miniCart)
        const cartChanged = !Immutable.is(newProps.cart, this.props.cart)
        return miniCartChanged || cartChanged
    }

    openEstimateShippingModal() {
        this.props.toggleEstimateShippingModal(true)
    }

    closeEstimateShippingModal() {
        this.props.toggleEstimateShippingModal(false)
    }

    openWishlistModal() {
        this.props.toggleWishlistModal(true)
    }

    closeWishlistModal() {
        this.props.toggleWishlistModal(false)
    }

    renderItems(cart) {
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
                        onSaveLater={this.openWishlistModal}
                    />
                </GridSpan>

                <GridSpan className={summaryClassnames} tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                    <CartSummary
                        cart={cart}
                        onCalculateClick={this.openEstimateShippingModal}
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

    renderEmpty(isCartEmptyAndLoaded) {
        const emptyCartClassnames = classNames('t-cart__empty u-flexbox u-flex u-direction-column u-align-center u-justify-center', {
            'u-visually-hidden': !isCartEmptyAndLoaded,
            't--hide': !isCartEmptyAndLoaded,
        })
        return (
            <GridSpan>
                <div className={emptyCartClassnames}>
                    <Image
                        className="u-margin-bottom-md"
                        height="140px"
                        width="140px"
                        alt="Illustrated upside-down top hat with a bug flying out"
                        src={getAssetUrl(`static/img/cart/empty-cart@2x.png`)}
                    />

                    <div className="u-padding-md">
                        <p className="u-padding-top u-padding-start-lg u-padding-end-lg u-text-align-center u-margin-bottom-lg">
                            Your shopping cart is empty. Sign in to retrieve saved items or continue shopping.
                        </p>

                        <Button className="c--primary u-text-uppercase u-h5 u-width-full u-margin-bottom-lg">
                            <Icon name="User" />
                            Sign In
                        </Button>

                        <Button className="c--tertiary u-text-uppercase u-h5 u-width-full">
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </GridSpan>
        )
    }

    render() {
        const cart = this.props.miniCart.get('cart').toJS()
        const contentsLoaded = this.props.miniCart.get('contentsLoaded')
        const {
            estimateShippingModal,
            wishlistModal
        } = this.props.cart.toJS()
        const isCartEmptyAndLoaded = cart.items.length === 0 && contentsLoaded
        const templateClassnames = classNames('t-cart u-bg-color-neutral-20', {
            't--loaded': contentsLoaded
        })

        return (
            <div className={templateClassnames}>
                <Grid className="u-center-piece">
                    {!isCartEmptyAndLoaded &&
                        this.renderItems(cart)
                    }

                    {this.renderEmpty(isCartEmptyAndLoaded)}
                </Grid>

                <CartEstimateShippingModal
                    isOpen={estimateShippingModal.isOpen}
                    closeModal={this.closeEstimateShippingModal}
                />

                <CartWishlistModal
                    isOpen={wishlistModal.isOpen}
                    closeModal={this.closeWishlistModal}
                />
            </div>
        )
    }
}

Cart.propTypes = {
    cart: PropTypes.object,
    miniCart: PropTypes.object,
    toggleEstimateShippingModal: PropTypes.func,
    toggleWishlistModal: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        miniCart: state.miniCart,
    }
}

const mapDispatchToProps = {
    toggleEstimateShippingModal: actions.toggleEstimateShippingModal,
    toggleWishlistModal: actions.toggleWishlistModal,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
