import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {closeModal, openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {fetchShippingMethodsEstimate} from '../../integration-manager/checkout/commands'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {urlToPathKey, parseLocationData} from '../../utils/utils'
import {getSelectedShippingMethod} from '../../store/checkout/shipping/selectors'
import {getFormValues, getFormRegisteredFields} from '../../store/form/selectors'
import {receiveCartContents} from '../../store/cart/actions'

import {
    CART_ESTIMATE_SHIPPING_MODAL,
    ESTIMATE_FORM_NAME,
    CART_REMOVE_ITEM_MODAL,
    CART_WISHLIST_MODAL
} from './constants'

import {removeFromCart, updateItemQuantity, addToWishlist} from '../../integration-manager/cart/commands'
import {addNotification} from '../app/actions'
import {getFormKey, getIsLoggedIn} from '../app/selectors'
import {trigger} from '../../utils/astro-integration'
import {makeFormEncodedRequest, makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getUenc} from '../product-details/selectors'
import {getCustomerEntityID} from '../../store/checkout/selectors'

export const receiveData = createAction('Receive Cart Data')
export const setRemoveItemId = createAction('Set item id for removal', ['removeItemId'])
export const setIsWishlistComplete = createAction('Set wishlist add complete', ['isWishlistAddComplete'])

export const fetchTaxEstimate = () => (dispatch, getState) => {
    const currentState = getState()
    const isLoggedIn = getIsLoggedIn(currentState)
    const formValues = getFormValues(ESTIMATE_FORM_NAME)(currentState)
    const entityID = getCustomerEntityID(currentState)
    const registeredFieldNames = getFormRegisteredFields(ESTIMATE_FORM_NAME)(currentState).map(({name}) => name)
    const address = parseLocationData(formValues, registeredFieldNames)

    const getTotalsURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/totals-information`
    const shippingMethod = getSelectedShippingMethod(currentState).toJS().value.split('_')

    const requestData = {
        addressInformation: {
            address,
            shipping_carrier_code: shippingMethod[0],
            shipping_method_code: shippingMethod[1]
        }
    }
    return makeJsonEncodedRequest(getTotalsURL, requestData, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            const cartTotals = {
                subtotal: `$${responseJSON.subtotal.toFixed(2)}`,
                subtotal_incl_tax: `$${responseJSON.subtotal_incl_tax.toFixed(2)}`,
                tax_amount: `$${responseJSON.tax_amount.toFixed(2)}`,
            }
            dispatch(receiveCartContents(cartTotals))
        })
}

export const submitEstimateShipping = () => {
    return (dispatch) => {
        dispatch(closeModal(CART_ESTIMATE_SHIPPING_MODAL))
        dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
            .then(() => {
                dispatch(fetchTaxEstimate())
            })
    }
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
