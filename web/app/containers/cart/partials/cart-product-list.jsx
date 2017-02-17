import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import {CART_WISHLIST_MODAL} from '../constants'
import {openModal} from '../../../store/modals/actions'
import {openRemoveItemModal} from '../actions'
import {updateItemQuantity} from '../../../store/cart/actions'
import {getCartItems, getCartSummaryCount} from '../../../store/cart/selectors'
import {noop} from 'progressive-web-sdk/dist/utils/utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import List from 'progressive-web-sdk/dist/components/list'
import ProductItem from '../../../components/product-item'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import Stepper from 'progressive-web-sdk/dist/components/stepper'

const productItemClassNames = 'u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end'

const ProductImage = ({src, alt}) => (
    <Image src={src} alt={alt} width="104px" height="104px" />
)

ProductImage.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string
}

const ProductSkeleton = () => (
    <ProductItem
        className={productItemClassNames}
        title={<SkeletonText type="h3" className="u-margin-bottom-sm" />}
        image={<ProductImage src="null" alt="null" />}
    >
        <SkeletonText width="60%" style={{lineHeight: '20px'}} />
        <SkeletonText width="60%" style={{lineHeight: '20px'}} className="u-margin-bottom-sm" />
        <div className="t-cart__product-content-placeholder" />
    </ProductItem>
)

/* eslint-disable camelcase */

const CartProductItem = ({product_name, product_image, item_id, qty, product_price, onSaveLater, onQtyChange, openRemoveItemModal}) => (
    <ProductItem
        className={productItemClassNames}
        title={<h2 className="u-h3">{product_name}</h2>}
        image={<ProductImage {...product_image} />}
        >
        <p className="u-color-neutral-50">Color: Maroon</p>
        <p className="u-margin-bottom-sm u-color-neutral-50">Size: XL</p>

        <FieldRow className="u-align-bottom">
            <Field label="Quantity" idFor={`quantity-${item_id}`}>
                <Stepper
                    className="pw--simple t-cart__product-stepper"
                    idForLabel={`quantity-${item_id}`}
                    incrementIcon="plus"
                    decrementIcon="minus"
                    initialValue={qty}
                    minimumValue={1}
                    onChange={(newVal) => { onQtyChange(item_id, newVal) }}
                    />
            </Field>

            <Field>
                <div className="u-text-align-end u-flex">
                    <div className="u-h5 u-color-accent u-text-semi-bold">{product_price}</div>
                    <div className="u-text-quiet"><em>Was $29.99</em></div>
                </div>
            </Field>
        </FieldRow>

        <div className="u-flexbox">
            <Button
                className="u-text-small u-color-brand u-flex-none"
                innerClassName="c--no-min-width u-padding-start-0 u-padding-bottom-0"
                >
                Edit
            </Button>

            <Button
                className="u-text-small u-color-brand u-padding-start-0 u-padding-end-0"
                innerClassName="u-padding-bottom-0"
                onClick={onSaveLater}
                >
                Save for Later
            </Button>

            <Button
                className="u-text-small u-color-brand qa-cart__remove-item"
                innerClassName="u-padding-end-0 u-padding-bottom-0"
                onClick={() => { openRemoveItemModal(item_id) }}
                >
                Remove
            </Button>
        </div>
    </ProductItem>
)

CartProductItem.defaultProps = {
    onQtyChange: noop
}

CartProductItem.propTypes = {
    item_id: PropTypes.string,
    openRemoveItemModal: PropTypes.func,
    product_image: PropTypes.object,
    product_name: PropTypes.string,
    product_price: PropTypes.string,
    qty: PropTypes.number,
    onQtyChange: PropTypes.func,
    onSaveLater: PropTypes.func
}

const CartProductList = ({items, summaryCount, onSaveLater, onUpdateItemQuantity, openRemoveItemModal}) => {
    const isCartEmpty = items.length === 0

    return (
        <div className="t-cart__product-list">
            <div className="t-cart__product-list-title u-padding-top-md u-padding-bottom-md">
                <div className="u-flexbox u-align-center">
                    <h1 className="u-flex">
                        Cart {summaryCount > 0 && <span>({summaryCount} Items)</span>}
                    </h1>

                    <Button className="u-flex-none u-color-brand" href="/customer/account/login/">
                        <Icon name="user" />
                        Sign in
                    </Button>
                </div>
            </div>

            <List className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom">
                {isCartEmpty && <ProductSkeleton />}
                {items.map((item) => (<CartProductItem {...item} key={item.item_id} onQtyChange={onUpdateItemQuantity} onSaveLater={onSaveLater} openRemoveItemModal={openRemoveItemModal} />))}
            </List>
        </div>
    )
}

CartProductList.propTypes = {
    items: PropTypes.array,
    openRemoveItemModal: PropTypes.func,
    summaryCount: PropTypes.number,
    onSaveLater: PropTypes.func,
    onUpdateItemQuantity: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    items: selectorToJS(getCartItems),
    summaryCount: getCartSummaryCount
})

const mapDispatchToProps = {
    onSaveLater: () => openModal(CART_WISHLIST_MODAL),
    onUpdateItemQuantity: updateItemQuantity,
    openRemoveItemModal
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProductList)
