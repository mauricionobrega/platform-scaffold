import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabelButton from '../../components/icon-label-button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import ProductItem from '../../components/product-item'
import * as miniCartActions from './actions'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

class MiniCart extends React.Component {
    componentDidMount() {
        // this.props.fetchContents()
    }

    renderList() {
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
            <div className="u-flex">
                <Button href="#" className="c--tertiary u-width-full u-margin-bottom u-text-capitalize">
                    View and edit cart
                </Button>

                <List>
                    <ProductItem
                        className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                        category="Potions"
                        title={<h2 className="u-h3">Unicorn Blood</h2>}
                        price="$14.00"
                        image={<Image
                            src="http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/u/n/unicorn-blood-1.png"
                            alt="Corked glass bottle of Unicorn Blood"
                            width="64px" />}
                    >
                        <div>
                            <p className="u-margin-bottom-sm">Qty: 1</p>
                            <p>Sub-Total: 1</p>
                        </div>
                    </ProductItem>

                    <ProductItem
                        className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                        category="Potions"
                        title={<h2 className="u-h3">Eye of Newt</h2>}
                        price="$12.00"
                        image={<Image
                            src="http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/s/l/sleeping-draught-1_1_.png"
                            alt="Corked glass bottle of Eye of Newt"
                            width="64px" />}
                    >
                        <div>
                            <p className="u-margin-bottom-sm">Qty: 1</p>
                            <p>Sub-Total: 1</p>
                        </div>
                    </ProductItem>

                    <ProductItem
                        className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                        category="Books"
                        title={<h2 className="u-h3">Dragon Breeding For Pleasure and Profit</h2>}
                        price="$30.00"
                        image={<Image
                            src="http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/d/r/dragon-breeding-for-pleasure-and-profit-1.png"
                            alt="Ragged, cryptic book"
                            imageWidth="64px" />}
                    >
                        <div>
                            <p className="u-margin-bottom-sm">Qty: 1</p>
                            <p>Sub-Total: 1</p>
                        </div>
                    </ProductItem>
                </List>

                <div className={subtotalClasses}>
                    <div className="u-flex u-text-uppercase">Subtotal:</div>
                    <div className="u-flex-none">$79.99</div>
                </div>
            </div>
        )
    }

    renderEmpty() {
        return (
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
    }

    render() {
        const {miniCart, closeMiniCart} = this.props
        const isOpen = miniCart.get('isOpen')
        const isEmpty = true // @TODO replace with actual functionality

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

                <div className="t-mini-cart__content u-flexbox u-column u-padding-md">
                    {isEmpty ? this.renderList() : this.renderEmpty()}

                    <div className="u-padding-top-lg u-flex-none">
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
    closeMiniCart: PropTypes.func,
    contentsLoaded: PropTypes.bool,
    fetchContents: PropTypes.func,
    miniCart: PropTypes.object,
}

MiniCart.defaultProps = {
    // contentsLoaded: false,
}

const mapStateToProps = (state) => {
    return {
        miniCart: state.miniCart
    }
}

export default connect(
    mapStateToProps,
    {
        closeMiniCart: miniCartActions.closeMiniCart
    }
)(MiniCart)
