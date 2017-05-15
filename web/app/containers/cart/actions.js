/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
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
import {
    removeFromCart,
    updateItemQuantity,
    addToWishlist,
    fetchTaxEstimate,
    putPromoCode,
    deletePromoCode
} from '../../integration-manager/cart/commands'
import {addNotification} from '../app/actions'
import {getIsLoggedIn} from '../../store/user/selectors'
import {trigger} from '../../utils/astro-integration'
import {getFormValues, getFormRegisteredFields} from '../../store/form/selectors'
import {getSelectedShippingMethod} from '../../store/checkout/shipping/selectors'
import {parseLocationData} from '../../utils/utils'

export const setRemoveItemId = createAction('Set item id for removal', ['removeItemId'])
export const setIsWishlistComplete = createAction('Set wishlist add complete', ['isWishlistAddComplete'])
export const setTaxRequestPending = createAction('Set tax request pending', ['taxRequestPending'])

const shippingFormSelector = createPropsSelector({
    formValues: getFormValues(ESTIMATE_FORM_NAME),
    registeredFields: getFormRegisteredFields(ESTIMATE_FORM_NAME),
    shippingMethod: getSelectedShippingMethod
})

const taxErrorNotification = {
    content: 'Unable to calculate tax.',
    id: 'taxError',
    showRemoveButton: true
}

export const submitEstimateShipping = () => (dispatch, getState) => {
    const currentState = getState()
    const {formValues, registeredFields, shippingMethod} = shippingFormSelector(currentState)
    const address = parseLocationData(formValues, registeredFields.map(({name}) => name))

    dispatch(setTaxRequestPending(true))
    dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
        .then(() => {
            return dispatch(fetchTaxEstimate(address, shippingMethod.value))
                .catch(() => dispatch(addNotification(taxErrorNotification)))
        })
        .then(() => {
            dispatch(closeModal(CART_ESTIMATE_SHIPPING_MODAL))
            dispatch(setTaxRequestPending(false))
        })
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

export const submitPromoCode = () => (dispatch) => {
    dispatch(putPromoCode())
        .catch(({message}) => {
            let notificationMessage
            if (message.includes('Unable to apply promo')) {
                notificationMessage = message
            } else {
                notificationMessage = 'Unable to apply promo'
            }
            dispatch(addNotification({
                content: notificationMessage,
                id: 'promoError',
                showRemoveButton: true
            }))
        })
}

export const removePromoCode = () => (dispatch) => {
    dispatch(deletePromoCode())
        .catch(() => {
            dispatch(addNotification({
                content: 'Unable to remove promo',
                id: 'promoError',
                showRemoveButton: true
            }))
        })
}
