import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import {CART_WISHLIST_MODAL} from '../constants'
import {openModal} from '../../../store/modals/actions'
import {getCartItems, getCartSummaryCount} from '../../../store/cart/selectors'

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

const CartProductItem = ({product_name, product_image, configure_url, idx, qty, product_price, onSaveLater}) => (
    <ProductItem
        className={productItemClassNames}
        title={<h2 className="u-h3">{product_name}</h2>}
        key={idx}
        image={<ProductImage {...product_image} />}
        >
        <p className="u-color-neutral-50">Color: Maroon</p>
        <p className="u-margin-bottom-sm u-color-neutral-50">Size: XL</p>

        <FieldRow className="u-align-bottom">
            <Field label="Quantity" idFor={`quantity-${idx}`}>
                <Stepper
                    className="pw--simple t-cart__product-stepper"
                    idForLabel={`quantity-${idx}`}
                    incrementIcon="plus"
                    decrementIcon="minus"
                    initialValue={qty}
                    minimumValue={1}
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
                href={configure_url}
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
                >
                Remove
            </Button>
        </div>
    </ProductItem>
)

CartProductItem.propTypes = {
    configure_url: PropTypes.string,
    idx: PropTypes.number,
    product_image: PropTypes.object,
    product_name: PropTypes.string,
    product_price: PropTypes.string,
    qty: PropTypes.number,
    onSaveLater: PropTypes.func
}

const CartProductList = ({items, summaryCount, onSaveLater}) => {
    const isCartEmpty = items.length === 0

    return (
        <div className="t-cart__product-list">
            <div className="t-cart__product-list-title u-padding-top-md u-padding-bottom-md">
                <div className="u-flexbox u-align-center">
                    <h1 className="u-flex">
                        Cart {summaryCount > 0 && <span>({summaryCount} Items)</span>}
                    </h1>

                    <Button className="u-flex-none u-color-brand">
                        <Icon name="user" />
                        Sign in
                    </Button>
                </div>
            </div>

            <List className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom">
                {isCartEmpty && <ProductSkeleton />}

                {items.map((item, idx) => (<CartProductItem {...item} key={idx} idx={idx} onSaveLater={onSaveLater} />))}
            </List>
        </div>
    )
}

CartProductList.propTypes = {
    items: PropTypes.array,
    summaryCount: PropTypes.number,
    onSaveLater: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
    items: selectorToJS(getCartItems),
    summaryCount: getCartSummaryCount
})

const mapDispatchToProps = {
    onSaveLater: () => openModal(CART_WISHLIST_MODAL)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProductList)
