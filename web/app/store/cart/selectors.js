import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../selectors'

export const getCartContentsLoaded = createSelector(
    globalSelectors.getCart,
    (cart) => cart.has('items')
)

export const getCartItems = createSelector(
    globalSelectors.getCart,
    (cart) => cart.get('items', Immutable.List())
)
export const getCartSubtotal = createGetSelector(globalSelectors.getCart, 'subtotal')
export const getCartHasItems = createSelector(
    getCartItems,
    (items) => items && items.size > 0
)
export const getCartSummaryCount = createGetSelector(globalSelectors.getCart, 'summary_count')
export const getSubtotalExcludingTax = createGetSelector(globalSelectors.getCart, 'subtotal_excl_tax')
export const getSubtotalIncludingTax = createGetSelector(globalSelectors.getCart, 'subtotal_incl_tax')
