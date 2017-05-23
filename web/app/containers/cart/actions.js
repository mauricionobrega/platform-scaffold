/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {createPropsSelector} from 'reselect-immutable-helpers'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {closeModal, openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {fetchShippingMethodsEstimate} from '../../integration-manager/checkout/commands'
import {
    CART_ESTIMATE_SHIPPING_MODAL,
    CART_REMOVE_ITEM_MODAL,
    CART_WISHLIST_MODAL,
    PROMO_ERROR
} from './constants'
import {
    removeFromCart,
    updateItemQuantity,
    addToWishlist,
    fetchTaxEstimate,
    putPromoCode,
    deletePromoCode
} from '../../integration-manager/cart/commands'
import {addNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {getIsLoggedIn} from '../../store/user/selectors'
import {trigger} from '../../utils/astro-integration'
import {ESTIMATE_FORM_NAME} from '../../store/form/constants'
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

export const submitEstimateShipping = () => (dispatch, getState) => {
    const currentState = getState()
    const {formValues, registeredFields, shippingMethod} = shippingFormSelector(currentState)
    const address = parseLocationData(formValues, registeredFields.map(({name}) => name))

    dispatch(setTaxRequestPending(true))
    dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
        .then(() => {
            return dispatch(fetchTaxEstimate(address, shippingMethod.value))
                .catch(() => dispatch(addNotification(
                    'taxError',
                    'Unable to calculate tax.',
                    true
                )))
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
            dispatch(addNotification(
                'cartUpdateError',
                error.message,
                true
            ))
        })
}

export const saveToWishlist = (productId, itemId, productURL) => (dispatch, getState) => {
    dispatch(setIsWishlistComplete(false))
    dispatch(openModal(CART_WISHLIST_MODAL))
    if (!getIsLoggedIn(getState())) {
        return Promise.resolve()
    }
    return dispatch(addToWishlist(productId, productURL))
        .then(() => {
            dispatch(removeItem(itemId))
            dispatch(setIsWishlistComplete(true))
        })
        .catch((error) => {
            if (/Failed to fetch|Add Request Failed|Unable to add item/i.test(error.message)) {
                dispatch(closeModal(CART_WISHLIST_MODAL))
                dispatch(addNotification(
                    'cartWishlistError',
                    'Unable to add item to wishlist.',
                    true
                ))
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
            dispatch(addNotification(
                'cartUpdateError',
                error.message,
                true
            ))
        })
}

export const submitPromoCode = (couponCode) => (dispatch) => {
    dispatch(putPromoCode(couponCode))
        .catch(({message}) => {
            let notificationMessage
            if (message.includes(PROMO_ERROR)) {
                notificationMessage = message
            } else {
                notificationMessage = PROMO_ERROR
            }
            dispatch(addNotification(
                'submitPromoError',
                notificationMessage,
                true
            ))
        })
}

export const removePromoCode = (couponCode) => (dispatch) => {
    dispatch(deletePromoCode(couponCode))
        .catch(() => {
            dispatch(addNotification(
                'removePromoError',
                'Unable to remove promo',
                true
            ))
        })
}
