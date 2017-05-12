/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCart} from '../../integration-manager/cart/commands'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {MINI_CART_MODAL} from './constants'

export const requestOpenMiniCart = () => (dispatch) => {
    dispatch(getCart())
    dispatch(openModal(MINI_CART_MODAL))
}
