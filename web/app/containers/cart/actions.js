
import {createAction} from '../../utils/utils'
import {closeModal, openModal} from '../../store/modals/actions'
import {fetchShippingMethodsEstimate} from '../../store/checkout/shipping/actions'
import {CART_ESTIMATE_SHIPPING_MODAL, ESTIMATE_FORM_NAME, CART_REMOVE_ITEM_MODAL} from './constants'

export const receiveData = createAction('Receive Cart Data')
export const setRemoveItemId = createAction('Set item id for removal', 'removeItemId')

export const submitEstimateShipping = () => {
    return (dispatch) => {
        dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
        dispatch(closeModal(CART_ESTIMATE_SHIPPING_MODAL))
    }
}

export const openRemoveItemModal = (itemId) => {
    return (dispatch) => {
        dispatch(openModal(CART_REMOVE_ITEM_MODAL))
        dispatch(setRemoveItemId(itemId))
    }
}
