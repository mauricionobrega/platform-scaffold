import {receiveModalContents} from '../../store/modals/actions'
import {CART_REMOVE_ITEM_MODAL} from './constants'


export const openRemoveItemModal = (itemId) =>
    receiveModalContents({modalName: CART_REMOVE_ITEM_MODAL, isOpen: true, itemId})
