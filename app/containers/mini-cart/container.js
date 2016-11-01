import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
// import Link from 'progressive-web-sdk/dist/components/link'

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
                    <Button className="c--tertiary u-width-full u-margin-bottom-md u-text-capitalize">
                        View and edit cart
                    </Button>

                    <List component={ProductItem} items={[{
                        category: 'Potions',
                        className: 'u-padding-botton-0',
                        title: <h2>Unicorn Blood</h2>,
                        price: '$14.00',
                        src: 'http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/u/n/unicorn-blood-1.png',
                        alt: 'Corked glass bottle of Unicorn Blood',
                        children: (
                            <div>
                                <p>Qty: 1</p>
                                <p>Sub-Total: 1</p>
                                <div className="u-color-brand">
                                    <Button innerClassName="u-padding-start-0 u-text-small" name="close" size="small">
                                        Edit
                                    </Button>
                                    <Button innerClassName="u-text-small" name="close" size="small">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        )
                    }, {
                        category: 'Potions',
                        className: 'u-padding-botton-0',
                        title: <h2>Eye of Newt</h2>,
                        price: '$12.00',
                        src: 'http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/s/l/sleeping-draught-1_1_.png',
                        alt: 'Corked glass bottle of Eye of Newt',
                        children: (
                            <div>
                                <p>Qty: 1</p>
                                <p>Sub-Total: 1</p>
                                <div className="u-color-brand">
                                    <Button innerClassName="u-padding-start-0 u-text-small" name="close" size="small">
                                        Edit
                                    </Button>
                                    <Button innerClassName="u-text-small" name="close" size="small">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        )
                    }, {
                        category: 'Books',
                        className: 'u-padding-botton-0',
                        title: <h2>Dragon Breeding For Pleasure and Profit</h2>,
                        price: '$30.00',
                        src: 'http://www.merlinspotions.com/media/catalog/product/cache/1/thumbnail/75x75/beff4985b56e3afdbeabfc89641a4582/d/r/dragon-breeding-for-pleasure-and-profit-1.png',
                        alt: 'Ragged, cryptic book',
                        children: (
                            <div>
                                <p>Qty: 1</p>
                                <p>Sub-Total: 1</p>
                                <div className="u-color-brand">
                                    <Button innerClassName="u-padding-start-0 u-text-small" name="close" size="small">
                                        Edit
                                    </Button>
                                    <Button innerClassName="u-text-small" name="close" size="small">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        )
                    }]} />

                    <div className="u-flexbox u-justify-between u-margin-bottom-lg">
                        <div className="u-h4 u-text-bold">Subtotal:</div>
                        <div className="u-h4 u-text-bold">$79.99</div>
                    </div>

                    <Button className="c--primary u-width-full u-text-uppercase">
                        Go To Checkout
                    </Button>
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
