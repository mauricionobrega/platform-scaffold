import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabelButton from '../../components/icon-label-button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import List from 'progressive-web-sdk/dist/components/list' // @TODO fix this to accept children
import ProductItem from '../../components/product-item'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import * as miniCartActions from './actions'
import * as assetUtils from 'progressive-web-sdk/dist/asset-utils'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'

class MiniCart extends React.Component {
    // componentDidMount() {
    //     this.props.fetchContents()
    // }

    render() {
        const { miniCart, closeMiniCart } = this.props
        const isOpen = miniCart.get('isOpen')

        // @TODO REPLACE with the Shopping Cart text
        const logoURL = assetUtils.getAssetUrl('static/svg/nav-logo.svg')
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
            <Sheet className="t-mini-cart"  open={isOpen} onDismiss={closeMiniCart} maskOpacity={0.85} effect="slide-right">
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                        <Image className="t-navigation__header-logo" src={logoURL} alt="Merlin's Potions Logo" />
                        <h2 className="u-visually-hidden">Shopping Cart</h2>
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <IconLabelButton iconName="close" label="close" onClick={closeMiniCart}>Close</IconLabelButton>
                    </HeaderBarActions>
                </HeaderBar>

                <div className="u-padding-md">
                    <Button className="c--tertiary u-width-full u-margin-bottom u-text-capitalize">
                        View and edit cart
                    </Button>

                    <List>
                        <ProductItem
                            className="u-padding-top-lg u-padding-bottom-lg"
                            category="Potions"
                            title={<h2 className="u-h3">Unicorn Blood</h2>}
                            price="$14.00"
                            src="http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/u/n/unicorn-blood-1.png"
                            alt="Corked glass bottle of Unicorn Blood"
                            imageWidth="64px"
                        >
                            <div>
                                <p className="u-margin-bottom-sm">Qty: 1</p>
                                <p>Sub-Total: 1</p>
                            </div>
                        </ProductItem>

                        <ProductItem
                            className="u-padding-top-lg u-padding-bottom-lg"
                            category="Potions"
                            title={<h2 className="u-h3">Eye of Newt</h2>}
                            price="$12.00"
                            src="http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/s/l/sleeping-draught-1_1_.png"
                            alt="Corked glass bottle of Eye of Newt"
                            imageWidth="64px"
                        >
                            <div>
                                <p className="u-margin-bottom-sm">Qty: 1</p>
                                <p>Sub-Total: 1</p>
                            </div>
                        </ProductItem>

                        <ProductItem
                            className="u-padding-top-lg u-padding-bottom-lg"
                            category="Books"
                            title={<h2 className="u-h3">Dragon Breeding For Pleasure and Profit</h2>}
                            price="$30.00"
                            src="http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/d/r/dragon-breeding-for-pleasure-and-profit-1.png"
                            alt="Ragged, cryptic book"
                            imageWidth="64px"
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

                    <div className="u-padding-top-lg">
                        <Button className="c--primary u-width-full u-text-uppercase">
                            Go To Checkout
                        </Button>
                    </div>
                </div>
            </Sheet>
        )
    }
}

MiniCart.propTypes = {
    contentsLoaded: PropTypes.bool,
    closeMiniCart: PropTypes.func,
    fetchContents: PropTypes.func,
}

MiniCart.defaultProps = {
    // contentsLoaded: false,
}

const mapStateToProps = (state) => {
    return {
        miniCart: state.miniCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeMiniCart: () => dispatch(),
    }
}

export default connect(
    mapStateToProps,
    {
        closeMiniCart: miniCartActions.closeMiniCart
    }
)(MiniCart)
