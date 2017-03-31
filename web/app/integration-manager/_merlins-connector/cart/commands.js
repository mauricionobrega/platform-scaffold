import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {removeNotification} from '../../../containers/app/actions'
import {receiveCartContents} from '../../cart/responses'
import {receiveCheckoutData} from '../../checkout/responses'
import {getFormKey} from '../selectors'
import parseCart from './parser'
import {parseLocations} from '../checkout/parsers'
import {fetchPageData} from '../app/commands'
import {parseCheckoutEntityID, extractMagentoJson} from '../../../utils/magento-utils'

const LOAD_CART_SECTION_URL = '/customer/section/load/?sections=cart%2Cmessages&update_section_id=true'
const REMOVE_CART_ITEM_URL = '/checkout/sidebar/removeItem/'
const UPDATE_ITEM_URL = '/checkout/sidebar/updateItemQty/'
const BASE_HEADERS = {
    Accept: 'application/json',
}
/**
 * Get the contents of the users cart
 */
export const getCart = () => (dispatch) => {
    const opts = {
        headers: BASE_HEADERS
    }
    dispatch(removeNotification('cartUpdateError'))
    const currentTimeMs = new Date().getTime()
    return makeRequest(`${LOAD_CART_SECTION_URL}&_=${currentTimeMs}`, opts)
        .then((response) => response.text())
        .then((responseText) => dispatch(receiveCartContents(parseCart(responseText))))
}

/**
 * Remove an item from the users cart
 *
 * Notes:
 *
 * - The `item_id` present in the data returned from getCart.
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 * - Important: The cart contents rendered in the main HTML is *not* updated until `getCart()` has been called which
 *   busts a cache. You are expected to call `removeFromCart()` then `getCart()` every time.
 */
export const removeFromCart = (itemId) => {
    return (dispatch, getState) => {
        return makeFormEncodedRequest(REMOVE_CART_ITEM_URL, {item_id: itemId, form_key: getFormKey(getState())}, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.success) {
                    return dispatch(getCart())
                }
                throw new Error('Unable to remove item')
            })
    }
}

/**
 * Update the quantity of an item in the users cart
 *
 * Notes:
 *
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 */
export const updateItemQuantity = (itemId, itemQuantity) => {
    return (dispatch, getState) => {
        const requestData = {
            item_id: itemId,
            item_qty: itemQuantity,
            form_key: getFormKey(getState())
        }

        return makeFormEncodedRequest(UPDATE_ITEM_URL, requestData, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.success) {
                    return dispatch(getCart())
                }
                throw new Error('Unable to update Quantity')
            })
    }
}

const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']

export const fetchCartPageData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            const customerEntityID = parseCheckoutEntityID($response)
            const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)
            const locationsData = parseLocations(magentoFieldData)

            dispatch(receiveCheckoutData({
                customerEntityID,
                ...locationsData
            }))
        })
        .then(() => {
            console.log('FETCH SHIPPING ESTIMATE DATA')
        })
}
