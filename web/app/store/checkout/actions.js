/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from '../../utils/utils'
import {extractMagentoShippingStepData, getCheckoutEntityID, extractMagentoJson} from '../../utils/magento-utils'

import parseLocations from './locations/parser'
import {parseShippingInitialValues} from './shipping/parser'

export const receiveCheckoutData = createAction('Receive Checkout Data')

export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', 'shipping')

export const receiveSavedShippingAddresses = createAction('Receive Saved Shipping Addresses', 'savedAddresses')

export const processCheckoutData = ({payload: {$response}}) => {
    return (dispatch) => {
        const customerEntityID = getCheckoutEntityID($response)
        const magentoFieldData = extractMagentoShippingStepData($response).getIn(['children', 'shipping-address-fieldset', 'children'])
        const address = parseShippingInitialValues(magentoFieldData)
        const locationsData = parseLocations(magentoFieldData)

        dispatch(receiveCheckoutData({
            // entity_id is used for API calls
            customerEntityID,
            ...locationsData,
            shipping: {address}
        }))
    }
}
const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']

export const processCartCheckoutData = ({payload: {$response}}) => {
    return (dispatch) => {
        const customerEntityID = getCheckoutEntityID($response)
        const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)
        const locationsData = parseLocations(magentoFieldData)

        dispatch(receiveCheckoutData({
            customerEntityID,
            ...locationsData
        }))

    }
}
