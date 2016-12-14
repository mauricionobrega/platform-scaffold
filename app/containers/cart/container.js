import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import {Grid, GridSpan} from '../../components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'

import CartProductList from './partials/cart-product-list'
import CartSummary from './partials/cart-summary'

class Cart extends React.Component {
    shouldComponentUpdate(newProps) {
        return !Immutable.is(newProps.miniCart, this.props.miniCart)
    }

    renderItems(cart) {
        return (
            <div>
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                    <CartProductList cart={cart} />
                </GridSpan>

                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                    <CartSummary cart={cart} />

                    <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg">
                        <Button className="c--tertiary u-width-full">
                            Continue Shopping
                        </Button>
                    </div>
                </GridSpan>
            </div>
        )
    }

    renderEmpty() {
        return (
            <GridSpan>
                <div className="t-cart__empty u-flexbox u-flex u-direction-column u-align-center u-justify-center">
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
        const productsArePresent = !!cart.items

        return (
            <div className="t-cart u-bg-color-neutral-20">
                <Grid className="u-center-piece">
                    {productsArePresent && cart.items.length ?
                        this.renderItems(cart)
                    :
                        this.renderEmpty()
                    }
                </Grid>
            </div>
        )
    }
}

Cart.propTypes = {
    cart: PropTypes.object,
    miniCart: PropTypes.object,
}

Cart.defaultProps = {
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        miniCart: state.miniCart
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
