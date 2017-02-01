import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getCart} from '../selectors'

export const getCartContentsLoaded = createSelector(
    getCart,
    (cart) => cart.has('items')
)

export const getCartItems = createGetSelector(getCart, 'items', Immutable.List())
export const getCartSubtotal = createGetSelector(getCart, 'subtotal')
export const getCartHasItems = createSelector(
    getCartItems,
    (items) => items && items.size > 0
)
export const getCartSummaryCount = createGetSelector(getCart, 'summary_count')
export const getSubtotalExcludingTax = createGetSelector(getCart, 'subtotal_excl_tax')
export const getSubtotalIncludingTax = createGetSelector(getCart, 'subtotal_incl_tax')
