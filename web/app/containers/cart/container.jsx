/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'

import {isRunningInAstro, trigger} from '../../utils/astro-integration'
import {getCartContentsLoaded, getCartHasItems} from '../../store/cart/selectors'
import EstimateShippingReduxForm from './partials/cart-estimate-shipping'

import CartWishlistModal from './partials/cart-wishlist'
import CartRemoveItemModal from './partials/cart-remove-item'
import CartItems from './partials/cart-items'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

export const openSignIn = () => {
    if (isRunningInAstro) {
        trigger('sign-in:clicked')
    } else {
        browserHistory.push('/customer/account/login/')
    }
}

export const continueShopping = () => {
    if (isRunningInAstro) {
        trigger('continue:clicked')
    }
}

const EmptyCartContents = ({hide}) => {
    const emptyCartClassnames = classNames('t-cart__empty u-flexbox u-flex u-direction-column u-align-center u-justify-center', {
        'u-visually-hidden': hide,
        't--hide': hide,
        't--viewport-height': isRunningInAstro
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
                    <Button className="c--primary u-text-uppercase u-h5 u-width-full u-margin-bottom-lg" onClick={openSignIn}>
                        <Icon name="User" />
                        Sign In
                    </Button>

                    <Button className="c--tertiary u-text-uppercase u-h5 u-width-full" onClick={continueShopping}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </GridSpan>
    )
}

EmptyCartContents.propTypes = {
    hide: PropTypes.bool,
}

class Cart extends React.Component {
    componentDidMount() {
        trigger('checkout:disable-alert')
    }

    render() {
        const {
            contentsLoaded,
            hasItems
        } = this.props
        const isCartEmptyAndLoaded = !hasItems && contentsLoaded
        const templateClassnames = classNames('t-cart u-bg-color-neutral-10', {
            't--loaded': contentsLoaded
        })

        return (
            <div className={templateClassnames}>
                <Grid className="u-center-piece">
                    {!isCartEmptyAndLoaded && <CartItems onContinueShopping={continueShopping} onOpenSignIn={openSignIn} />}

                    <EmptyCartContents hide={!isCartEmptyAndLoaded} />
                </Grid>

                <EstimateShippingReduxForm />
                <CartWishlistModal />
                <CartRemoveItemModal />
            </div>
        )
    }
}

Cart.propTypes = {
    contentsLoaded: PropTypes.bool,
    hasItems: PropTypes.bool,
    removeItemID: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    contentsLoaded: getCartContentsLoaded,
    hasItems: getCartHasItems
})

export default connect(mapStateToProps)(Cart)
