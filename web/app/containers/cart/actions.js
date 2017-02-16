import {createAction} from '../../utils/utils'
import {openModal} from '../../store/modals/actions'
import {CART_REMOVE_ITEM_MODAL} from './constants'

export const receiveData = createAction('Receive Cart Data')

export const openRemoveItemModal = (itemId) => {
    return (dispatch) => {
        dispatch(openModal(CART_REMOVE_ITEM_MODAL))
        dispatch(receiveData({removeItemId: itemId}))
    }
}
