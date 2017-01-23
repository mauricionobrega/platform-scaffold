import React, {PropTypes} from 'react'

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

const renderProductImage = (src, alt) => (
    <Image src={src} alt={alt} width="104px" height="104px" />
)

const renderProductSkeleton = () => (
    <ProductItem
        className={productItemClassNames}
        title={<SkeletonText type="h3" className="u-margin-bottom-sm" />}
        image={renderProductImage('null', 'null')}
    >
        <SkeletonText width="60%" style={{lineHeight: '20px'}} />
        <SkeletonText width="60%" style={{lineHeight: '20px'}} className="u-margin-bottom-sm" />
        <div className="t-cart__product-content-placeholder" />
    </ProductItem>
)

const CartProductList = ({cart, onSaveLater}) => {
    const isCartEmpty = cart.items.length === 0

    return (
        <div className="t-cart__product-list">
            <div className="t-cart__product-list-title u-padding-top-md u-padding-bottom-md">
                <div className="u-flexbox u-align-center">
                    <h1 className="u-flex">
                        Cart {cart.summary_count > 0 && <span>({cart.summary_count} Items)</span>}
                    </h1>

                    <Button className="u-flex-none u-color-brand">
                        <Icon name="user" />
                        Sign in
                    </Button>
                </div>
            </div>

            <List className="u-bg-color-neutral-10 u-border-light-top u-border-light-bottom">
                {isCartEmpty && renderProductSkeleton()}

                {cart.items.map((item, idx) => (
                    <ProductItem
                        className={productItemClassNames}
                        title={<h2 className="u-h3">{item.product_name}</h2>}
                        key={idx}
                        image={renderProductImage(item.product_image.src, item.product_image.alt)}
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
                                    initialValue={item.qty}
                                    minimumValue={1}
                                />
                            </Field>

                            <Field>
                                <div className="u-text-align-end u-flex">
                                    <div className="u-h5 u-color-accent u-text-semi-bold">{item.product_price}</div>
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
                                className="u-text-small u-color-brand qa-cart-remove-item"
                                innerClassName="u-padding-end-0 u-padding-bottom-0"
                            >
                                Remove
                            </Button>
                        </div>
                    </ProductItem>
                ))}
            </List>
        </div>
    )
}

CartProductList.propTypes = {
    cart: PropTypes.object,
    onSaveLater: PropTypes.func,
}

export default CartProductList
