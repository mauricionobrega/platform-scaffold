import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getCart, getProducts} from '../selectors'

export const getCartLoaded = createHasSelector(getCart, 'items')

const getCartItemsPrivate = createGetSelector(getCart, 'items', Immutable.List())

export const getCartItems = createSelector(
    getCartItemsPrivate,
    getProducts,
    (items, products) => items.map((item) => {
        const productId = item.get('productId')
        return item.set('product', products.find((product) => productId === product.get('id')))
    })
)

export const getCartHasItems = createSelector(
    getCartItems,
    (items) => items.size > 0
)

export const getCartSummaryCount = createSelector(
    getCartItems,
    (items) => items.reduce((quantity, cartItem) => quantity + cartItem.get('quantity'), 0)
)

export const getSubtotal = createGetSelector(getCart, 'subtotal')
export const getOrderTotal = createGetSelector(getCart, 'orderTotal')
