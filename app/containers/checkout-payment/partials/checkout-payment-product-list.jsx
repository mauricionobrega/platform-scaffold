import React, {PropTypes} from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'
import List from 'progressive-web-sdk/dist/components/list'
import ProductItem from '../../../components/product-item'

const CheckoutPaymentProductList = ({cart}) => (
    <div className="t-checkout-payment__product-list">
        <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
            <h2 className="u-h4">Order Summary</h2>
        </div>

        <List className="u-bg-color-neutral-10 u-border-light-top u-border-light-bottom">
            {cart.items.map((item, idx) => {
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
                        <div className="u-flexbox">
                            <div className="u-flex-none">
                                <p className="u-color-neutral-50">Color: Maroon</p>
                                <p className="u-margin-bottom-sm u-color-neutral-50">Size: XL</p>
                                <p className="u-margin-bottom-sm u-color-neutral-50">Quantity: x</p>
                            </div>

                            <div className="u-text-align-end u-flex">
                                <div className="u-h5 u-color-accent u-text-semi-bold">$19.99</div>
                                <div className="u-text-quiet"><em>Was $29.99</em></div>
                            </div>
                        </div>
                    </ProductItem>
                )
            })}
        </List>

        <div className="u-bg-color-neutral-10">
            <Ledger>
                <LedgerRow
                    label={`Subtotal (${cart.summary_count} items)`}
                    value={cart.subtotal_excl_tax}
                />

                <LedgerRow
                    label="Shipping (Flat - Fixed Rate)"
                    value="$10.00"
                />
            </Ledger>

            <Accordion>
                <AccordionItem header="Accordion Item #1">
                    <FieldRow>
                        <Field label="Enter discount code">
                            <input type="text" placeholder="Enter discount code" />
                            <Button className="c--tertiary">Apply</Button>
                        </Field>
                    </FieldRow>
                </AccordionItem>
            </Accordion>

            <Ledger>
                <LedgerRow
                    label="Total"
                    isTotal={true}
                    value={cart.subtotal_incl_tax}
                />
            </Ledger>

            <div className="u-padding-end-md u-padding-bottom-lg u-padding-start-md">
                <Button className="c--primary u-flex-none u-width-full">
                    <Icon name="lock" />
                    Place Your Order
                </Button>
            </div>

            <div className="u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                <Image
                    src={getAssetUrl('static/img/checkout/verisign-mcafee-secure.png')}
                    alt="Verisign and McAfee Secure"
                    height="38px"
                    width="150px"
                />
            </div>
        </div>
    </div>
)

CheckoutPaymentProductList.propTypes = {
    cart: PropTypes.object,
}

export default CheckoutPaymentProductList
