/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import throttle from 'lodash.throttle'

// Selectors
import * as selectors from '../selectors'
import * as cartSelectors from '../../../store/cart/selectors'
import {getSelectedShippingRate, getSelectedShippingLabel} from '../../../store/checkout/shipping/selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// Partials
import PaymentProductItem from './payment-product-item'

// SDK Components
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'
import List from 'progressive-web-sdk/dist/components/list'

class OrderSummary extends React.Component {
    constructor(props) {
        super(props)

        this.handleScroll = throttle(this.handleScroll.bind(this), 200)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const {isFixedPlaceOrderShown} = this.props
        const footerHeight = 200
        const scrollPosition = window.pageYOffset
        const windowSize = window.innerHeight
        const bodyHeight = document.body.offsetHeight
        const distanceFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0)
        const newIsFixedPlaceOrderShown = distanceFromBottom > footerHeight

        if (newIsFixedPlaceOrderShown !== isFixedPlaceOrderShown) {  // Saves triggering the action
            this.props.toggleFixedPlaceOrder(newIsFixedPlaceOrderShown)
        }
    }

    render() {
        const {
            // cart,
            cartItems,
            isFixedPlaceOrderShown,
            orderTotal,
            subtotal,
            summaryCount,
            shippingRate,
            shippingLabel,
            taxAmount
        } = this.props

        const cart = {
        }

        return (
            <div className="t-checkout-payment__order-summary">
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-md">
                    <h2 className="u-h4 u-text-uppercase">Order Summary</h2>
                </div>

                <div className="u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                    <List>
                        {cartItems.map((item, idx) =>
                            <PaymentProductItem {...item} key={idx} />
                        )}
                    </List>

                    <Ledger className="u-border-light-top">
                        <LedgerRow
                            label={`Subtotal (${summaryCount} items)`}
                            value={subtotal}
                        />

                        <LedgerRow
                            label={`Shipping (${shippingLabel})`}
                            value={shippingRate}
                        />

                        {taxAmount &&
                            <LedgerRow
                                className="u-flex-none u-border-0"
                                label="Taxes"
                                value={taxAmount}
                            />
                        }

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

                    <Ledger className="u-margin-top-sm u-margin-bottom-sm">
                        <LedgerRow
                            label="Total"
                            isTotal={true}
                            value={orderTotal}
                        />
                    </Ledger>

                    {/* This is the statically positioned "Place Your Order" container */}
                    <div className="u-padding-end-md u-padding-start-md">
                        <Button className="c--primary u-flex-none u-width-full u-text-all-caps" type="submit">
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
                        <div className="u-padding-md u-bg-color-neutral-00 u-text-align-center">
                            <Button className="c--primary u-flex-none u-width-full u-text-all-caps" type="submit">
                                <Icon name="lock" />
                                Place Your Order
                            </Button>

                            <p className="u-margin-top-md">
                                Total: <strong>{orderTotal}</strong>
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
    }
}

OrderSummary.propTypes = {
    cart: PropTypes.object,

    /**
     * Cart item data
     */
    cartItems: PropTypes.array,

    /**
     * Whether the fixed 'Place Order' container displays
     */
    isFixedPlaceOrderShown: PropTypes.bool,

    /**
     * The total cost of the order
     */
    orderTotal: PropTypes.string,

    /**
     * Shipping rate label
     */
    shippingLabel: PropTypes.string,

    /**
     * Shipping rate amount
     */
    shippingRate: PropTypes.string,

    /**
     * Total of all cart items (excluding shipping and taxes)
     */
    subtotal: PropTypes.string,

    /**
     * Total item count in cart
     */
    summaryCount: PropTypes.number,

    /**
     * Tax amount
     */
    taxAmount: PropTypes.string,

    /**
     * Handle scroll to toggle fixed 'Place Order' container
     */
    toggleFixedPlaceOrder: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    cartItems: cartSelectors.getCartItems,
    subtotal: cartSelectors.getSubtotal,
    orderTotal: cartSelectors.getOrderTotal,
    shippingRate: getSelectedShippingRate,
    shippingLabel: getSelectedShippingLabel,
    taxAmount: cartSelectors.getTaxAmount,
    summaryCount: cartSelectors.getCartSummaryCount,
    isFixedPlaceOrderShown: selectors.getIsFixedPlaceOrderShown
})

const mapDispatchToProps = {
    toggleFixedPlaceOrder: checkoutPaymentActions.toggleFixedPlaceOrder
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderSummary)
