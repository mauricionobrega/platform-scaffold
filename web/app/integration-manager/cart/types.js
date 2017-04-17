import * as Runtypes from 'runtypes'

import {URL, Money, ProductID, Integer, Identifier} from '../types'

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
    contents: Runtypes.Array(CartItem),
    subtotalWithTax: Money,
    subtotalWithoutTax: Money,
    taxes: Runtypes.Array(Tax)
})
