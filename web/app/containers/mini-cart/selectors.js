import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getMiniCartContentsLoaded = createSelector(
    globalSelectors.getCart,
    (cart) => cart.has('items')
)

export const getMiniCartItems = createGetSelector(globalSelectors.getCart, 'items')
export const getMiniCartSubtotal = createGetSelector(globalSelectors.getCart, 'subtotal')
export const getMiniCartHasItems = createSelector(
    getMiniCartItems,
    (items) => items && items.size > 0
)
export const getMiniCartSummaryCount = createGetSelector(globalSelectors.getCart, 'summary_count')
export const getSubtotalExcludingTax = createGetSelector(globalSelectors.getCart, 'subtotal_excl_tax')
export const getSubtotalIncludingTax = createGetSelector(globalSelectors.getCart, 'subtotal_incl_tax')
