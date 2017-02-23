import {createAction, urlToPathKey} from '../../utils/utils'
import {getCart} from '../../store/cart/actions'
import * as selectors from './selectors'
import * as appSelectors from '../app/selectors'
import {openModal} from '../../store/modals/actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from './constants'
import productDetailsParser from './parsers/product-details'

import * as commands from '../../integration-manager/commands'

export const receiveNewItemQuantity = createAction('Set item quantity')
export const setItemQuantity = (quantity) => (dispatch, getStore) => {
    dispatch(receiveNewItemQuantity({
        [appSelectors.getCurrentPathKey(getStore())]: {
            itemQuantity: quantity
        }
    }))
}

export const receiveData = createAction('Receive Product Details data')
export const process = ({payload}) => {
    const {$, $response, url} = payload
    const parsed = productDetailsParser($, $response)
    return receiveData({[urlToPathKey(url)]: parsed})
}

export const submitCartForm = () => (dispatch, getStore) => {
    const key = appSelectors.getCurrentPathKey(getStore())
    const qty = selectors.getItemQuantity(getStore())

    return dispatch(commands.addToCart(key, qty))
        .then(() => {
            dispatch(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
            dispatch(getCart())
        })
}
