/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'

import * as cartSelectors from '../../store/cart/selectors'
/**
 * OrderTotal displays the total that includes tax, discount, subtotal
 */

const OrderTotal = ({
    className,
    orderTotal,
    subtotal,
    taxAmount,
    discountAmount
}) => {
    const classes = classNames('c-order-total', className)

    let displayTotal
    if (discountAmount && !taxAmount) {
        displayTotal = subtotal
    } else if (taxAmount) {
        displayTotal = orderTotal
    } else {
        displayTotal = subtotal
    }

    return (
        <Ledger className={classes}>
            <LedgerRow
                label="Total"
                isTotal={true}
                value={displayTotal}
            />
        </Ledger>
    )
}

OrderTotal.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
    discountAmount: PropTypes.string,
    orderTotal: PropTypes.string,
    subtotal: PropTypes.string,
    taxAmount: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    discountAmount: cartSelectors.getDiscountAmount,
    orderTotal: cartSelectors.getOrderTotal,
    subtotal: cartSelectors.getSubtotal,
    taxAmount: cartSelectors.getTaxAmount,
})

export default connect(mapStateToProps)(OrderTotal)
