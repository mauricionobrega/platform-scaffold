import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getMiniCart = createSelector(
    globalSelectors.getUi,
    ({miniCart}) => miniCart
)

export const getCartObject = createGetSelector(getMiniCart, 'cart')
export const getMiniCartContentsLoaded = createGetSelector(getMiniCart, 'contentsLoaded')
export const getMiniCartIsOpen = createGetSelector(getMiniCart, 'isOpen')
