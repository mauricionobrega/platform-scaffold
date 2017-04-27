import {createPropsSelector} from 'reselect-immutable-helpers'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {closeModal, openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {fetchShippingMethodsEstimate} from '../../integration-manager/checkout/commands'
import {
    CART_ESTIMATE_SHIPPING_MODAL,
    ESTIMATE_FORM_NAME,
    CART_REMOVE_ITEM_MODAL,
    CART_WISHLIST_MODAL
} from './constants'
import {removeFromCart, updateItemQuantity, addToWishlist, fetchTaxEstimate} from '../../integration-manager/cart/commands'
import {addNotification} from '../app/actions'
import {getIsLoggedIn} from '../app/selectors'
import {trigger} from '../../utils/astro-integration'
import {getFormValues, getFormRegisteredFields} from '../../store/form/selectors'
import {getSelectedShippingMethod} from '../../store/checkout/shipping/selectors'
import {parseLocationData} from '../../utils/utils'

export const receiveData = createAction('Receive Cart Data')
export const setRemoveItemId = createAction('Set item id for removal', ['removeItemId'])
export const setIsWishlistComplete = createAction('Set wishlist add complete', ['isWishlistAddComplete'])

const shippingFormSelector = createPropsSelector({
    formValues: getFormValues(ESTIMATE_FORM_NAME),
    registeredFields: getFormRegisteredFields(ESTIMATE_FORM_NAME),
    shippingMethod: getSelectedShippingMethod
})

export const submitEstimateShipping = () => (dispatch, getState) => {
    const currentState = getState()
    const {formValues, registeredFields, shippingMethod} = shippingFormSelector(currentState)
    const address = parseLocationData(formValues, registeredFields.map(({name}) => name))

    dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
        .then(() => dispatch(fetchTaxEstimate(address, shippingMethod.value)))
    dispatch(closeModal(CART_ESTIMATE_SHIPPING_MODAL))
}

export const removeItem = (itemID) => (dispatch) => {
    return dispatch(removeFromCart(itemID))
        .then(() => {
            // Tell Astro the cart has updated, so it can coordinate
            // all active webviews to refresh if needed
            trigger('cart:updated')
        })
        .catch((error) => {
            dispatch(addNotification({
                content: error.message,
                id: 'cartUpdateError',
                showRemoveButton: true
            }))
        })
}

export const saveToWishlist = (productId, itemId, productURL) => (dispatch, getState) => {
    dispatch(setIsWishlistComplete(false))
    dispatch(openModal(CART_WISHLIST_MODAL))
    if (!getIsLoggedIn(getState())) {
        return Promise.resolve()
    }
    const wishListErrorNotification = {
        content: 'Unable to add item to wishlist.',
        id: 'cartWishlistError',
        showRemoveButton: true
    }

    return dispatch(addToWishlist(productId, productURL))
        .then(() => {
            dispatch(removeItem(itemId))
            dispatch(setIsWishlistComplete(true))
        })
        .catch((error) => {
            if (/Failed to fetch|Add Request Failed|Unable to add item/i.test(error.message)) {
                dispatch(closeModal(CART_WISHLIST_MODAL))
                dispatch(addNotification(wishListErrorNotification))
            } else {
                throw error
            }
        })
}

export const openRemoveItemModal = (itemId) => {
    return (dispatch) => {
        dispatch(openModal(CART_REMOVE_ITEM_MODAL))
        dispatch(setRemoveItemId(itemId))
    }
}

export const updateItem = (itemId, itemQuantity) => (dispatch) => {
    return dispatch(updateItemQuantity(itemId, itemQuantity))
        .catch((error) => {
            dispatch(addNotification({
                content: error.message,
                id: 'cartUpdateError',
                showRemoveButton: true
            }))
        })
}
