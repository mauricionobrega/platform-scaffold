import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {createAction, urlToPathKey} from '../../utils/utils'
import {closeModal, openModal} from '../../store/modals/actions'
import {fetchShippingMethodsEstimate} from '../../store/checkout/shipping/actions'
import {getDefaultShippingMethod} from '../../store/checkout/shipping/selectors'
import {getFormValues, getFormRegisteredFields} from '../../store/form/selectors'
import {receiveCartContents} from '../../store/cart/actions'
import {
    CART_ESTIMATE_SHIPPING_MODAL,
    ESTIMATE_FORM_NAME,
    CART_REMOVE_ITEM_MODAL,
    CART_WISHLIST_MODAL,
    ADD_TO_WISHLIST_URL
} from './constants'
import {removeFromCart} from '../../store/cart/actions'
import {makeFormEncodedRequest, makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getUenc} from '../product-details/selectors'
import {addNotification} from '../app/actions'
import {getFormKey, getIsLoggedIn} from '../app/selectors'
import {getCustomerEntityID} from '../../store/checkout/selectors'


export const receiveData = createAction('Receive Cart Data')
export const setRemoveItemId = createAction('Set item id for removal', 'removeItemId')
export const setIsWishlistComplete = createAction('Set wishlist add complete', 'isWishlistAddComplete')

export const fetchTaxEstimate = () => (dispatch, getState) => {
    const currentState = getState()
    const isLoggedIn = getIsLoggedIn(currentState)
    const formValues = getFormValues(ESTIMATE_FORM_NAME)(currentState)
    const entityID = getCustomerEntityID(currentState)
    const registeredFieldNames = getFormRegisteredFields(ESTIMATE_FORM_NAME)(currentState).map(({name}) => name)
    // Default values to use if none have been selected
    const address = {country_id: 'US', region_id: '0', postcode: null}

    if (formValues) {
        // Only return the field value if the field is registered
        const getRegisteredFieldValue = (fieldName) => {
            return registeredFieldNames.includes(fieldName) ? formValues[fieldName] : undefined
        }
        address.country_id = getRegisteredFieldValue('country_id')
        address.region_id = getRegisteredFieldValue('region_id')
        address.postcode = getRegisteredFieldValue('postcode')
        if (formValues.region) {
            address.region = getRegisteredFieldValue('region')
            // Remove the region_id in case we have an old value
            delete address.region_id
        }
    }
    const getTotalsURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/totals-information`
    const shippingMethod = getDefaultShippingMethod(currentState).toJS().value.split('_')

    const requestData = {
        addressInformation: {
            address,
            shipping_carrier_code: shippingMethod[0],
            shipping_method_code: shippingMethod[1]
        }
    }
    return makeJsonEncodedRequest(getTotalsURL, requestData, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON)=> {
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
            .then(()=> {
                dispatch(fetchTaxEstimate())
            })
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

    return makeFormEncodedRequest(ADD_TO_WISHLIST_URL, payload, {method: 'POST'})
}

export const saveToWishlist = (productId, itemId, productURL) => (dispatch, getState) => {
    dispatch(setIsWishlistComplete(false))
    dispatch(openModal(CART_WISHLIST_MODAL))
    if (!getIsLoggedIn(getState())) {
        return
    }
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

export const openRemoveItemModal = (itemId) => {
    return (dispatch) => {
        dispatch(openModal(CART_REMOVE_ITEM_MODAL))
        dispatch(setRemoveItemId(itemId))
    }
}
