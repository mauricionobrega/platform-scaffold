import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import {Grid, GridSpan} from '../../components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'

import * as actions from './actions'
import * as miniCartSelectors from '../mini-cart/selectors'
import CartProductList from './partials/cart-product-list'
import CartSummary from './partials/cart-summary'
import CartEstimateShippingModal from './partials/cart-estimate-shipping'
import CartWishlistModal from './partials/cart-wishlist'
import CartItems from './partials/cart-items'

const EmptyCartContents = ({hide}) => {
    const emptyCartClassnames = classNames('t-cart__empty u-flexbox u-flex u-direction-column u-align-center u-justify-center', {
        'u-visually-hidden': hide,
        't--hide': hide
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

                    <Button className="c--primary u-text-uppercase u-h5 u-width-full u-margin-bottom-lg" href="/customer/account/login/">
                        <Icon name="User" />
                        Sign In
                    </Button>

                    <Button className="c--tertiary u-text-uppercase u-h5 u-width-full" href="/">
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </GridSpan>
    )
}

EmptyCartContents.propTypes = {
    hide: PropTypes.bool
}

class Cart extends React.Component {
    constructor(props) {
        super(props)

        this.openEstimateShippingModal = this.openEstimateShippingModal.bind(this)
        this.closeEstimateShippingModal = this.closeEstimateShippingModal.bind(this)
        this.openWishlistModal = this.openWishlistModal.bind(this)
        this.closeWishlistModal = this.closeWishlistModal.bind(this)
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

    render() {
        const {
            contentsLoaded,
            hasItems
        } = this.props
        const isCartEmptyAndLoaded = !hasItems && contentsLoaded
        const templateClassnames = classNames('t-cart u-bg-color-neutral-20', {
            't--loaded': contentsLoaded
        })

        return (
            <div className={templateClassnames}>
                <Grid className="u-center-piece">
                    {!isCartEmptyAndLoaded &&
                        <CartItems openWishlistModal={this.openWishlistModal} openEstimateShippingModal={this.openEstimateShippingModal} />
                    }

                    <EmptyCartContents hide={!isCartEmptyAndLoaded} />
                </Grid>

                <CartEstimateShippingModal closeModal={this.closeEstimateShippingModal} />

                <CartWishlistModal closeModal={this.closeWishlistModal} />
            </div>
        )
    }
}

Cart.propTypes = {
    contentsLoaded: PropTypes.bool,
    hasItems: PropTypes.bool,
    toggleEstimateShippingModal: PropTypes.func,
    toggleWishlistModal: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
    contentsLoaded: miniCartSelectors.getMiniCartContentsLoaded,
    hasItems: miniCartSelectors.getMiniCartHasItems
})

const mapDispatchToProps = {
    toggleEstimateShippingModal: actions.toggleEstimateShippingModal,
    toggleWishlistModal: actions.toggleWishlistModal,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
