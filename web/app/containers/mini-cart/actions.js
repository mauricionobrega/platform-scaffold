import {createAction} from '../../utils/utils'
import {getCart} from '../cart/actions'

export const openMiniCart = createAction('Open mini-cart')
export const closeMiniCart = createAction('Close mini-cart')

export const requestOpenMiniCart = () => (dispatch) => {
    dispatch(getCart())
    dispatch(openMiniCart())
}
