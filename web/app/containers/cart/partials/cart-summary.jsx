/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as cartSelectors from '../../../store/cart/selectors'
import {CART_ESTIMATE_SHIPPING_MODAL} from '../constants'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {getSelectedShippingRate, getSelectedShippingLabel, getPostcode} from '../../../store/checkout/shipping/selectors'
import {getCheckoutShippingURL} from '../../app/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import CartPromoForm from './cart-promo-form'
import Icon from 'progressive-web-sdk/dist/components/icon'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const CartSummary = ({summaryCount, subtotal, orderTotal, shippingRate, shippingLabel, onCalculateClick, zipCode, taxAmount, checkoutShippingURL}) => {
    const calculateButton = (
        <Button innerClassName="u-padding-end-0 u-color-brand u-text-letter-spacing-normal" onClick={onCalculateClick}>
            Calculate <Icon name="chevron-right" />
        </Button>
    )

    const editButton = (
        <span>Based on delivery to
            <Button innerClassName="u-padding-start-sm u-color-brand u-text-letter-spacing-normal" onClick={onCalculateClick}>
                {zipCode}
            </Button>
        </span>
    )

    return (
        <div className="t-cart__summary">
            <Accordion className="u-margin-top u-bg-color-neutral-00">
                <AccordionItem header="Promo code">
                    <CartPromoForm />
                </AccordionItem>
            </Accordion>
            <div className="t-cart__summary-title u-padding-top-lg u-padding-bottom-md">
                <h2 className="u-h4 u-text-uppercase">
                    Order Summary
                </h2>
            </div>

            <div className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom">
                <Ledger className="u-border-light-top">
                    <LedgerRow
                        label={`Subtotal (${summaryCount} items)`}
                        value={subtotal}
                    />

                    {/* <LedgerRow
                        label="Discount: FREESHIP"
                        valueAction={<span className="u-color-accent">-$10.00</span>}
                    />*/}

                    {!taxAmount ?
                        <LedgerRow
                            className="u-flex-none"
                            label="Taxes"
                            labelAction="Rates based on shipping location"
                            valueAction={calculateButton}
                        />
                    :
                    [
                        <LedgerRow
                            label={`Shipping (${shippingLabel})`}
                            value={shippingRate}
                            key={`Shipping (${shippingLabel})`}
                        />,
                        <LedgerRow
                            className="u-flex-none u-border-0"
                            label="Taxes"
                            labelAction={editButton}
                            value={taxAmount}
                            key="Taxes"
                        />
                    ]
                    }

                    <LedgerRow
                        label="Total"
                        isTotal={true}
                        value={orderTotal}
                    />
                </Ledger>

                <div className="u-padding-end-md u-padding-bottom-lg u-padding-start-md">
                    <Button
                        className="c--primary u-flex-none u-width-full u-text-uppercase qa-cart__checkout"
                        href={checkoutShippingURL}>
                        <Icon name="lock" />
                        Proceed To Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}


CartSummary.propTypes = {
    checkoutShippingURL: PropTypes.string,
    orderTotal: PropTypes.string,
    shippingLabel: PropTypes.string,
    shippingRate: PropTypes.string,
    subtotal: PropTypes.string,
    summaryCount: PropTypes.number,
    taxAmount: PropTypes.string,
    zipCode: PropTypes.string,
    onCalculateClick: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    checkoutShippingURL: getCheckoutShippingURL,
    subtotal: cartSelectors.getSubtotal,
    orderTotal: cartSelectors.getOrderTotal,
    shippingRate: getSelectedShippingRate,
    shippingLabel: getSelectedShippingLabel,
    zipCode: getPostcode,
    taxAmount: cartSelectors.getTaxAmount,
    summaryCount: cartSelectors.getCartSummaryCount,
})

const mapDispatchToProps = {
    onCalculateClick: () => openModal(CART_ESTIMATE_SHIPPING_MODAL)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)
