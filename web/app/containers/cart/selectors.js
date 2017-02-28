import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getCart = createSelector(getUi, ({cart}) => cart)
export const getRemoveItemID = createGetSelector(getCart, 'removeItemId')
export const getIsWishlistAddComplete = createGetSelector(getCart, 'isWishlistAddComplete')
