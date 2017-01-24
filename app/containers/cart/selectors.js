import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import {CART_ESTIMATE_SHIPPING, CART_WISHLIST} from './constants'

export const getCart = createSelector(
    globalSelectors.getUi,
    ({cart}) => cart
)

export const getIsEstimateShippingModalOpen = globalSelectors.getModal(CART_ESTIMATE_SHIPPING)
export const getIsWishlistModalOpen = globalSelectors.getModal(CART_WISHLIST)
export const getCountries = createGetSelector(getCart, 'countries')
export const getStateProvinces = createGetSelector(getCart, 'stateProvinces')
