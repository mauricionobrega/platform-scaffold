import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
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
import {addNotification} from '../app/actions'
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


const addToWishlist = (productId, productURL) => (dispatch, getState) => {
    const payload = {
        product: productId,
        // This won't always be defined, but add to wishlist will still work
        // if it's missing
        uenc: getUenc(urlToPathKey(productURL))(getState()),
        formKey: getFormKey(getState())
    }

    return makeFormEncodedRequest(ADD_TO_WISHLIST_URL, {}, {method: 'POST'})
}

export const saveToWishlist = (productId, itemId, productURL) => (dispatch, getState) => {
    dispatch(openModal(CART_WISHLIST_MODAL))
    if (getIsLoggedIn(getState())) {
        const wishListErrorNotification = {
            content: 'Unable to add item to wishlist.',
            id: 'cartWishlistError',
            showRemoveButton: true
        }


        dispatch(addToWishlist(productId, productURL))
            .then(jqueryResponse)
            .then((response) => {
                const [$, $response] = response // eslint-disable-line no-unused-vars
                // The response is the HTML of the wishlist page, so check for the item we added
                if ($response.find(`.product-item-link[href="${productURL}"]`).length) {
                    dispatch(removeFromCart(itemId))
                    dispatch(setIsWishlistComplete(true))
                    return
                }
                throw new Error('Add Request Failed')
            })
            .catch((error) => {
                if (/Failed to fetch|Add Request Failed/i.test(error.message)) {
                    dispatch(closeModal(CART_WISHLIST_MODAL))
                    dispatch(addNotification(wishListErrorNotification))
                } else {
                    throw error
                }
            })
    }
}

export const openRemoveItemModal = (itemId) => {
    return (dispatch) => {
        dispatch(openModal(CART_REMOVE_ITEM_MODAL))
        dispatch(setRemoveItemId(itemId))
    }
}
