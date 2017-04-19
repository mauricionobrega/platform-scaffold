import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getCart} from '../selectors'

export const getCartContentsLoaded = createHasSelector(getCart, 'contents')

export const getCartItems = createGetSelector(getCart, 'items', Immutable.List())
export const getCartHasItems = createSelector(
    getCartItems,
    (items) => items.size > 0
)
export const getCartSummaryCount = createSelector(
    getCartItems,
    (items) => items.size
)

export const getSubtotalWithTax = createGetSelector(getCart, 'subtotalWithTax')
export const getSubtotalWithoutTax = createGetSelector(getCart, 'subtotalWithoutTax')
