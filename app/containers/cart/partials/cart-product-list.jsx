import React, {PropTypes} from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import List from 'progressive-web-sdk/dist/components/list'
import ProductItem from '../../../components/product-item'
import Stepper from 'progressive-web-sdk/dist/components/stepper'

const CartProductList = ({items}) => (
    <div className="t-cart__product-list">
        <div className="t-cart__product-list-title u-padding-top-md u-padding-bottom-md">
            <div className="u-flexbox u-align-center">
                <h1 className="u-flex">
                    Cart (x Items)
                </h1>

                <Button className="u-flex-none u-color-brand">
                    <Icon name="user" />
                    Sign in
                </Button>
            </div>
        </div>

        <List className="u-bg-color-neutral-10 u-border-light-top u-border-light-bottom">
            {items.map((item, idx) => {
                const productImage = (
                    <Image
                        src={item.product_image.src}
                        alt={item.product_image.alt}
                        width="104px"
                        height="104px"
                    />
                )

                return (
                    <ProductItem
                        className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                        title={<h2 className="u-h3">{item.product_name}</h2>}
                        key={idx}
                        image={productImage}
                    >
                        <p className="u-color-neutral-50">Color: Maroon</p>
                        <p className="u-margin-bottom-sm u-color-neutral-50">Size: XL</p>

                        <FieldRow>
                            <Field label="Quantity" idFor={`quantity-${idx}`}>
                                <Stepper
                                    className="pw--simple"
                                    idForLabel={`quantity-${idx}`}
                                    incrementIcon="plus"
                                    decrementIcon="minus"
                                />
                            </Field>

                            <Field>
                                <div className="u-text-align-end u-flex">
                                    <div className="u-h5 u-color-accent u-text-semi-bold">$19.99</div>
                                    <div className="u-text-quiet"><em>Was $29.99</em></div>
                                </div>
                            </Field>
                        </FieldRow>

                        <div className="u-flexbox">
                            <Button
                                className="u-text-small u-color-brand u-flex-none"
                                innerClassName="c--no-min-width u-padding-start-0 u-padding-end-0 u-padding-bottom-0"
                            >
                                Edit
                            </Button>

                            <Button
                                className="u-text-small u-color-brand"
                                innerClassName="u-padding-bottom-0"
                            >
                                Save for Later
                            </Button>

                            <Button
                                className="u-text-small u-color-brand"
                                innerClassName="u-padding-start-0 u-padding-end-0 u-padding-bottom-0"
                            >
                                Remove
                            </Button>
                        </div>
                    </ProductItem>
                )
            })}
        </List>
    </div>
)

CartProductList.propTypes = {
    items: PropTypes.array
}

export default CartProductList
