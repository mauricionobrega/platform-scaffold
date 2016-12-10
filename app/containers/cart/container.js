import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import {Grid, GridSpan} from '../../components/grid'

import Button from 'progressive-web-sdk/dist/components/button'
import CartProductList from './partials/cart-product-list'
import CartSummary from './partials/cart-summary'

class Cart extends React.Component {
    shouldComponentUpdate(newProps) {
        return !Immutable.is(newProps.miniCart, this.props.miniCart)
    }

    render() {
        let items = this.props.miniCart.getIn(['cart', 'items'], false)
        const productsArePresent = !!items

        if (items) {
            items = items.toJS()
        }

        return (
            <div className="t-cart u-bg-color-neutral-20">
                <Grid className="u-center-piece">
                    <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                        {productsArePresent &&
                            <CartProductList items={items} />
                        }
                    </GridSpan>

                    <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                        <CartSummary />

                        <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg">
                            <Button className="c--tertiary u-width-full">
                                Continue Shopping
                            </Button>
                        </div>
                    </GridSpan>
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
