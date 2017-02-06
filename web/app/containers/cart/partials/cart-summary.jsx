import React, {PropTypes} from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import CartPromoForm from './cart-promo-form'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'

const CartSummary = ({cart, onCalculateClick}) => {
    const calculateButton = (
        <Button innerClassName="u-padding-end-0 u-color-brand" onClick={onCalculateClick}>
            Calculate <Icon name="chevron-right" />
        </Button>
    )

    return (
        <div className="t-cart__summary">
            <div className="t-cart__summary-title">
                <div className="u-flexbox u-align-center">
                    <h2 className="u-flex">
                        Order Summary
                    </h2>
                </div>
            </div>

            <div className="u-bg-color-neutral-10 u-border-light-top u-border-light-bottom">
                <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg">
                    <CartPromoForm />
                </div>

                <Ledger className="u-border-light-top">
                    <LedgerRow
                        label={`Subtotal (${cart.summary_count} items)`}
                        value={cart.subtotal_excl_tax}
                    />

                    <LedgerRow
                        label="Shipping (Flat - Fixed Rate)"
                        value="$10.00"
                    />

                    <LedgerRow
                        label="Discount: FREESHIP"
                        valueAction={<span className="u-color-accent">-$10.00</span>}
                    />

                    <LedgerRow
                        className="u-flex-none"
                        label="Taxes"
                        labelAction="Rates are based on your shipping location."
                        valueAction={calculateButton}
                    />

                    <LedgerRow
                        label="Total"
                        isTotal={true}
                        value={cart.subtotal_incl_tax}
                    />
                </Ledger>

                <div className="u-padding-end-md u-padding-bottom-lg u-padding-start-md">
                    <Button
                        className="c--primary u-flex-none u-width-full u-text-uppercase"
                        href="/checkout/shipping/">
                        <Icon name="lock" />
                        Proceed To Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

CartSummary.propTypes = {
    cart: PropTypes.object,
    onCalculateClick: PropTypes.func
}

export default CartSummary
