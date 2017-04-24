import * as Runtypes from 'runtypes'

import {URL, Money, ProductID, Text, Integer, Identifier} from '../types'

const CartItem = Runtypes.Record({
    id: Identifier,
    productId: ProductID,
    href: URL, // This is temporary
    quantity: Integer
})

const Tax = Runtypes.Record({
    label: Text,
    amount: Money
})

export const Cart = Runtypes.Record({
    /**
     * The cart items in the cart
     */
    contents: Runtypes.Array(CartItem),
    /**
     * The total price of all product items
     */
    subtotal: Money,
    /**
     * All taxes applied to items in this cart
     */
    taxes: Runtypes.Array(Tax),
    /**
     * The total price of the order, including products, shipping and tax
     */
    orderTotal: Money
})
