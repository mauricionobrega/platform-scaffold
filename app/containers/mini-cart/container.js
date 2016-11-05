import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabelButton from '../../components/icon-label-button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import List from 'progressive-web-sdk/dist/components/list'
import ProductItem from '../../components/product-item'
import * as miniCartActions from './actions'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

class MiniCart extends React.Component {
    componentDidMount() {
        this.props.fetchContents()
    }

    render() {
        const {contentsLoaded} = this.props

        if (!contentsLoaded) {
            return (
                <div />
            )
        }

        const {cart, closeMiniCart, isOpen} = this.props

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
            <Sheet className="t-mini-cart" open={isOpen} onDismiss={closeMiniCart} maskOpacity={0.7} effect="slide-right">
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                        <h2 className="t-mini-cart__title u-heading-family u-text-uppercase">
                            <span className="u-text-lighter">Shopping</span> Cart
                        </h2>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="close" label="close" onClick={closeMiniCart}>Close</IconLabelButton>
                    </HeaderBarActions>
                </HeaderBar>

                <div className="u-padding-md">
                    <Button href="#" className="c--tertiary u-width-full u-margin-bottom u-text-capitalize">
                        View and edit cart
                    </Button>

                    <List>
                        {cart.items.map((product, idx) => {
                            return (
                                <ProductItem
                                    className="u-padding-top-lg u-padding-bottom-lg"
                                    category="Potions"
                                    title={<h2 className="u-h3">{product.product_name}</h2>}
                                    price={product.product_price}
                                    src={product.product_image.src}
                                    alt={product.product_image.alt}
                                    imageWidth="64px" // TODO
                                    key={idx}
                                >
                                    <div>
                                        <p className="u-margin-bottom-sm">Qty: {product.qty}</p>
                                        <p>Sub-Total: {product.qty}</p>
                                    </div>
                                </ProductItem>
                            )
                        })
                    }
                    </List>

                    <div className={subtotalClasses}>
                        <div className="u-flex u-text-uppercase">Subtotal:</div>
                        <div className="u-flex-none">{cart.subtotal}</div>
                    </div>

                    <div className="u-padding-top-lg">
                        <Button href="#" className="c--primary u-width-full u-text-uppercase">
                            Go To Checkout
                        </Button>
                    </div>
                </div>
            </Sheet>
        )
    }
}

MiniCart.propTypes = {
    contentsLoaded: PropTypes.bool.isRequired,

    cart: PropTypes.object,
    closeMiniCart: PropTypes.func,
    fetchContents: PropTypes.func,
    isOpen: PropTypes.bool,
}

MiniCart.defaultProps = {
    contentsLoaded: false,
}

const mapStateToProps = (state) => {
    return {
        ...state.miniCart.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchContents: () => dispatch(miniCartActions.fetchContents()),
        closeMiniCart: () => dispatch(miniCartActions.closeMiniCart())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniCart)
