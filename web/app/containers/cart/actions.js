
import {createAction} from '../../utils/utils'
import {closeModal, openModal} from '../../store/modals/actions'
import {fetchShippingMethodsEstimate} from '../../store/checkout/shipping/actions'
import {
    CART_ESTIMATE_SHIPPING_MODAL,
    ESTIMATE_FORM_NAME,
    CART_REMOVE_ITEM_MODAL,
    CART_WISHLIST_MODAL
} from './constants'
import {removeFromCart} from '../../store/cart/actions'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getUenc} from '../pdp/selectors'
import {getFormKey} from '../app/selectors'

export const receiveData = createAction('Receive Cart Data')
export const setRemoveItemId = createAction('Set item id for removal', 'removeItemId')

export const submitEstimateShipping = () => {
    return (dispatch) => {
        dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
        dispatch(closeModal(CART_ESTIMATE_SHIPPING_MODAL))
    }
}

const ADD_TO_WISHLIST_URL = '/wishlist/index/add'

export const addToWishlist = (productId) => (dispatch, getState) => {
    const payload = {
        product: productId,
        uenc: getUenc(getState()),
        formKey: getFormKey(getState())
    }

    console.log(payload)

    return makeFormEncodedRequest(ADD_TO_WISHLIST_URL, payload, {method: 'POST'})
}

export const saveToWishlist = (productId, itemId) => (dispatch) => {
    dispatch(openModal(CART_WISHLIST_MODAL))
    dispatch(receiveData({wishlistItemId: itemId}))
    dispatch(addToWishlist(productId))
        .then(() => dispatch(removeFromCart(itemId)))

}

export const openRemoveItemModal = (itemId) => {
    return (dispatch) => {
        dispatch(openModal(CART_REMOVE_ITEM_MODAL))
        dispatch(setRemoveItemId(itemId))
    }
}
