import {getCart} from '../../store/cart/actions'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {MINI_CART_MODAL} from './constants'

export const requestOpenMiniCart = () => (dispatch) => {
    dispatch(getCart())
    dispatch(openModal(MINI_CART_MODAL))
}
