import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import ProductItem from '../../components/product-item'
import * as selectors from './selectors'
import * as miniCartActions from './actions'
import * as cartActions from '../cart/actions'
import {stripEvent} from '../../utils/utils'

import MiniCartHeader from './partials/mini-cart-header'

// Parses strings in the format: $Dollars.Cents
// Dollar amounts only, cents must be specified.
export const productSubtotal = (price, quantity) => {
    const priceInCents = price.replace(/[$,. ]/g, '')
    const priceNumber = parseFloat(priceInCents) / 100
    return (priceNumber * quantity).toFixed(2)
}

const MiniCartProductList = ({cart}) => {
    const subtotalClasses = classNames(
        't-mini-cart__subtotal',

        'u-flexbox',
        'u-justify-between',
        'u-margin-bottom-lg',
        'u-padding-top-lg',

        'u-h4',
        'u-heading-family'
    )

    return (
        <div className="u-padding-md">
            <Button href="#" className="c--tertiary u-width-full u-margin-bottom u-text-capitalize">
                View and edit cart
            </Button>

            <List>
                {cart.items.map((product, idx) =>
                    <ProductItem
                        className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                        title={<h2 className="u-h3">{product.product_name}</h2>}
                        price={product.product_price}
                        key={idx}
                        image={<Image src={product.product_image.src} alt={product.product_image.alt} width="64px" height="64px" />}
                        >
                        <div>
                            <p className="u-margin-bottom-sm">Qty: {product.qty}</p>
                            <p>Sub-Total: ${productSubtotal(product.product_price, product.qty)}</p>
                        </div>
                    </ProductItem>
                )}
            </List>

            <div className={subtotalClasses}>
                <div className="u-flex u-text-uppercase">Subtotal:</div>
                <div className="u-flex-none">{cart.subtotal}</div>
            </div>
        </div>
    )
}

MiniCartProductList.propTypes = {
    cart: PropTypes.object
}

const MiniCartEmpty = () => (
    <div className="t-mini-cart__empty-content u-flexbox u-flex u-column">
        <Image
            className="u-margin-bottom-md"
            height="140px"
            width="140px"
            alt="Illustrated upside-down top hat with a bug flying out"
            src={getAssetUrl(`static/img/cart/empty-cart@2x.png`)} />

        <p className="t-mini-cart__empty-message u-text-align-center">
            You have no items in your shopping cart.
        </p>
    </div>
)

const MiniCartMain = ({hasItems, cart}) => (
    <div className="t-mini-cart__content u-flexbox u-column u-padding-md">
        {hasItems ? <MiniCartProductList cart={cart} /> : <MiniCartEmpty />}

        <div className="u-padding-top-lg u-flex-none">
            <Button href="#" className="c--primary u-width-full u-text-uppercase">
                {hasItems ? 'Go To Checkout' : 'Continue Shopping'}
            </Button>
        </div>
    </div>
)

MiniCartMain.propTypes = {
    cart: PropTypes.object,
    hasItems: PropTypes.bool
}

class MiniCart extends React.Component {
    componentDidMount() {
        this.props.fetchContents()
    }

    render() {
        const {cart, contentsLoaded, isOpen, closeMiniCart} = this.props
        const hasItems = cart ? cart.items.length > 0 : false

        return (
            <Sheet className="t-mini-cart" open={isOpen} onDismiss={closeMiniCart} maskOpacity={0.7} effect="slide-right">
                <MiniCartHeader />

                {contentsLoaded && <MiniCartMain hasItems={hasItems} cart={cart} />}
            </Sheet>
        )
    }
}

MiniCart.propTypes = {
    cart: PropTypes.object.isRequired,
    closeMiniCart: PropTypes.func,
    contentsLoaded: PropTypes.bool,
    fetchContents: PropTypes.func,
    isOpen: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
    cart: selectorToJS(selectors.getCartObject),
    contentsLoaded: selectors.getMiniCartContentsLoaded,
    isOpen: selectors.getMiniCartIsOpen
})

const mapDispatchToProps = {
    fetchContents: cartActions.getCart,
    closeMiniCart: stripEvent(miniCartActions.closeMiniCart)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniCart)
