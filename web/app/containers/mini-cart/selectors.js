import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getMiniCart = createSelector(
    globalSelectors.getUi,
    ({miniCart}) => miniCart
)

export const getCartObject = createGetSelector(getMiniCart, 'cart')
export const getMiniCartContentsLoaded = createGetSelector(getMiniCart, 'contentsLoaded')
export const getMiniCartItems = createGetSelector(getCartObject, 'items')
export const getMiniCartSubtotal = createGetSelector(getCartObject, 'subtotal')
export const getMiniCartHasItems = createSelector(
    getMiniCartItems,
    (items) => items.size > 0
)
export const getMiniCartSummaryCount = createGetSelector(getCartObject, 'summary_count')
export const getSubtotalExcludingTax = createGetSelector(getCartObject, 'subtotal_excl_tax')
export const getSubtotalIncludingTax = createGetSelector(getCartObject, 'subtotal_incl_tax')
