import {getCart} from '../cart/actions'
import * as modalActions from '../../store/modals/actions'

export const openMiniCart = () => modalActions.openModal('mini-cart')
export const closeMiniCart = () => modalActions.closeModal('mini-cart')

export const requestOpenMiniCart = () => (dispatch) => {
    dispatch(getCart())
    dispatch(openMiniCart())
}
