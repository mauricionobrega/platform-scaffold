/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as Runtypes from 'runtypes'

import {URL, Money, ProductID, Text, Integer, Identifier} from '../types'

const CartItem = Runtypes.Record({
    id: Identifier,
    productId: ProductID,
    href: URL, // This is temporary
    quantity: Integer,
    /**
     * The unit price of the item
     */
    itemPrice: Money,
    /**
     * The aggregated line price of the item (typically qty * itemPrice)
     */
    linePrice: Money
})

const Tax = Runtypes.Record({
    label: Text,
    amount: Money
})

const Shipping = Runtypes.Record({
    label: Text,
    amount: Money
})

export const Cart = Runtypes.Record({
    /**
     * The cart items in the cart
     */
    items: Runtypes.Array(CartItem),
    /**
     * The total of all cart line items before shipping and taxes.
     */
    subtotal: Money,
    /**
     * The total price of the order, including products, shipping and tax
     */
    orderTotal: Money
}).And(Runtypes.Optional({
    /**
     * All taxes applied to items in this cart
     */
    taxes: Tax,
    /**
     * Sum of shipping charges applied to this cart
     */
    shipping: Shipping
}))
