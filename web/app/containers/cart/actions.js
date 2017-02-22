
import {createAction, urlToPathKey} from '../../utils/utils'
import {closeModal, openModal} from '../../store/modals/actions'
import {fetchShippingMethodsEstimate} from '../../store/checkout/shipping/actions'
import {
    CART_ESTIMATE_SHIPPING_MODAL,
    ESTIMATE_FORM_NAME,
    CART_REMOVE_ITEM_MODAL,
    CART_WISHLIST_MODAL,
    ADD_TO_WISHLIST_URL
} from './constants'
import {removeFromCart} from '../../store/cart/actions'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getUenc} from '../pdp/selectors'
import {getFormKey, getIsLoggedIn} from '../app/selectors'

export const receiveData = createAction('Receive Cart Data')
export const setRemoveItemId = createAction('Set item id for removal', 'removeItemId')
export const setIsWishlistComplete = createAction('Set wishlist add complete', 'isWishlistAddComplete')

export const submitEstimateShipping = () => {
    return (dispatch) => {
        dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
        dispatch(closeModal(CART_ESTIMATE_SHIPPING_MODAL))
    }
}


export const addToWishlist = (productId, productURL) => (dispatch, getState) => {
    const payload = {
        product: productId,
        // This won't always be defined, but we can add to wishlist will still work
        // if it's missing
        uenc: getUenc(urlToPathKey(productURL))(getState()),
        formKey: getFormKey(getState())
    }

    debugger

    console.log(payload)

    return makeFormEncodedRequest(ADD_TO_WISHLIST_URL, payload, {method: 'POST'})
}

export const saveToWishlist = (productId, itemId, productURL) => (dispatch, getState) => {
    dispatch(openModal(CART_WISHLIST_MODAL))
    if (getIsLoggedIn(getState())) {
        dispatch(addToWishlist(productId, productURL))
            .then(() => dispatch(removeFromCart(itemId)))
            .then(() => {
                dispatch(setIsWishlistComplete(true))
            })
    }
}

export const openRemoveItemModal = (itemId) => {
    return (dispatch) => {
        dispatch(openModal(CART_REMOVE_ITEM_MODAL))
        dispatch(setRemoveItemId(itemId))
    }
}
