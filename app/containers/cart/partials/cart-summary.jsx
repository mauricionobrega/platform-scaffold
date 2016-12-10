import React, {PropTypes} from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import CartPromoForm from './cart-promo-form'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'

const CartSummary = () => {
    const calculateButton = (
        <Button innerClassName="u-padding-end-0 u-color-brand">
            Calculate <Icon name="chevron-right" />
        </Button>
    )

    return (
        <div className="t-cart__summary">
            <div className="t-cart__summary-title u-padding-top-md u-padding-bottom-md">
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
                        label="Subtotal (x items)"
                        value="$59.99"
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
                        value="$59.99"
                    />
                </Ledger>

                <div className="u-padding-end-md u-padding-bottom-lg u-padding-start-md">
                    <Button className="c--primary u-flex-none u-width-full">
                        <Icon name="star" />
                        Proceed To Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

CartSummary.propTypes = {
    items: PropTypes.array
}

export default CartSummary
