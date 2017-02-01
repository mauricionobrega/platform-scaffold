import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Image from 'progressive-web-sdk/dist/components/image'
import * as selectors from './selectors'
import {getCart} from '../../store/cart/actions'
import {isModalOpen} from '../../store/selectors'
import {closeModal} from '../../store/modals/actions'
import {MINI_CART_MODAL} from './constants'
import {stripEvent} from '../../utils/utils'

import MiniCartHeader from './partials/mini-cart-header'
import MiniCartProductList from './partials/mini-cart-product-list'

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

const MiniCartMain = ({hasItems}) => (
    <div className="t-mini-cart__content u-flexbox u-column u-padding-md">
        {hasItems ? <MiniCartProductList /> : <MiniCartEmpty />}

        <div className="u-padding-top-lg u-flex-none">
            <Button href="#" className="c--primary u-width-full u-text-uppercase">
                {hasItems ? 'Go To Checkout' : 'Continue Shopping'}
            </Button>
        </div>
    </div>
)

MiniCartMain.propTypes = {
    hasItems: PropTypes.bool
}

class MiniCart extends React.Component {
    componentDidMount() {
        this.props.getCart()
    }

    render() {
        const {hasItems, contentsLoaded, isOpen, closeMiniCart} = this.props

        return (
            <Sheet className="t-mini-cart" open={isOpen} onDismiss={closeMiniCart} maskOpacity={0.7} effect="slide-right">
                <MiniCartHeader closeMiniCart={closeMiniCart} />

                {contentsLoaded && <MiniCartMain hasItems={hasItems} />}
            </Sheet>
        )
    }
}

MiniCart.propTypes = {
    closeMiniCart: PropTypes.func,
    contentsLoaded: PropTypes.bool,
    getCart: PropTypes.func,
    hasItems: PropTypes.bool,
    isOpen: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
    contentsLoaded: selectors.getCartContentsLoaded,
    isOpen: isModalOpen(MINI_CART_MODAL),
    hasItems: selectors.getCartHasItems
})

const mapDispatchToProps = {
    getCart,
    closeMiniCart: stripEvent(() => closeModal(MINI_CART_MODAL))
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniCart)
