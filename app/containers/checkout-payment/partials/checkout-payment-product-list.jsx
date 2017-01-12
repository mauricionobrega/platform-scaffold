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

const CheckoutPaymentProductList = ({cart, isFixedPlaceOrderShown}) => (
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
                        <div className="u-flexbox u-align-bottom">
                            <div className="u-flex-none u-color-neutral-50">
                                {item.options.map(({label, value}, idx) => (
                                    <p
                                        className={idx > 0 ? 'u-margin-top-sm' : ''}
                                        key={`${item.item_id}-option-${idx}`}
                                    >
                                        {label}: {value}
                                    </p>
                                ))}

                                <p className={item.options > 0 ? 'u-margin-top-sm' : ''}>
                                    Qty: {item.qty}
                                </p>
                            </div>

                            <div className="u-text-align-end u-flex">
                                {item.onSale ?
                                    <div>
                                        <div className="u-h5 u-color-accent u-text-semi-bold">
                                            {item.product_sale_price}
                                        </div>

                                        <div className="u-text-quiet">
                                            <em>Was {item.product_old_price}</em>
                                        </div>
                                    </div>
                                :
                                    <div className="u-h5 u-text-semi-bold">
                                        {item.product_price}
                                    </div>
                                }
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

                {cart.shipping_rate &&
                    <LedgerRow
                        label={`Shipping (${cart.shipping_rate_label})`}
                        value={cart.shipping_rate}
                    />
                }

                {cart.promo_rate &&
                    <LedgerRow
                        className="u-border-light-bottom"
                        label={`Shipping (${cart.promo_rate_label})`}
                        value={cart.promo_rate}
                    />
                }
            </Ledger>

            {!cart.promo_rate &&
                <Accordion>
                    <AccordionItem header="Promo code">
                        <FieldRow>
                            <Field label="Enter discount code">
                                <input type="text" placeholder="Enter discount code" />
                                <Button className="c--tertiary">Apply</Button>
                            </Field>
                        </FieldRow>
                    </AccordionItem>
                </Accordion>
            }

            <Ledger>
                <LedgerRow
                    label="Total"
                    isTotal={true}
                    value={cart.total_incl_tax}
                />
            </Ledger>

            {/* This is the statically positioned "Place Your Order" container */}
            <div className="u-padding-end-md u-padding-bottom-lg u-padding-start-md">
                <Button className="c--primary u-flex-none u-width-full u-text-all-caps">
                    <Icon name="lock" />
                    Place Your Order
                </Button>
            </div>

            {/* This is the FIXED positioned "Place Your Order" container */}
            <div
                className={`t-checkout-payment__fixed-place-order ${isFixedPlaceOrderShown && 't--show'}`}
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="u-padding-md u-bg-color-neutral-10 u-text-align-center">
                    <Button className="c--primary u-flex-none u-width-full u-text-all-caps">
                        <Icon name="lock" />
                        Place Your Order
                    </Button>

                    <p className="u-margin-top-md">
                        Total: <strong>{cart.total_incl_tax}</strong>
                    </p>
                </div>
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
    isFixedPlaceOrderShown: PropTypes.bool,
}

export default CheckoutPaymentProductList
