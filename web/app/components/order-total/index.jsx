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
    orderTotal
}) => {
    const classes = classNames('c-order-total', className)
    return (
        <Ledger className={classes}>
            <LedgerRow
                label="Total"
                isTotal={true}
                value={orderTotal}
            />
        </Ledger>
    )
}

OrderTotal.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
    orderTotal: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    orderTotal: cartSelectors.getOrderTotal,
})

export default connect(mapStateToProps)(OrderTotal)
