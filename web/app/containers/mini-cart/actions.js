/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCart} from '../../store/cart/actions'
import * as modalActions from '../../store/modals/actions'
import {MINI_CART_MODAL} from './constants'

export const requestOpenMiniCart = () => (dispatch) => {
    dispatch(getCart())
    dispatch(modalActions.openModal(MINI_CART_MODAL))
}
