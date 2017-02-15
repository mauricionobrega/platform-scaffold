import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi, getModal} from '../../store/selectors'
import {CART_REMOVE_ITEM_MODAL} from './constants'

export const getCart = createSelector(getUi, ({cart}) => cart)

export const getRemoveItemID = createGetSelector(getModal(CART_REMOVE_ITEM_MODAL), 'itemId')

export const getCountries = createGetSelector(getCart, 'countries')
export const getStateProvinces = createGetSelector(getCart, 'stateProvinces')
