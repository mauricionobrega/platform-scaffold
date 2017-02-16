import {createAction} from '../../utils/utils'
import {extractMagentoShippingStepData, getCheckoutConfigObject} from '../../utils/magento-utils'

import parseLocations from './locations/parser'
import {parseShippingInitialValues} from './shipping/parser'

export const receiveCheckoutData = createAction('Receive Checkout Data')

export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', 'shipping')

export const processCheckoutData = ({payload: {$response}}) => {
    return (dispatch) => {
        const configObject = getCheckoutConfigObject($response)
        const shippingStepData = extractMagentoShippingStepData($response)
        let checkoutData = {
            // entity_id is used for calls to the ID
            customerEntityID: configObject ? configObject.quoteData.entity_id : ''
        }
        if (shippingStepData) {
            const magentoFieldData = shippingStepData.getIn(['children', 'shipping-address-fieldset', 'children'])
            const initialValues = parseShippingInitialValues(magentoFieldData)
            const locationsData = parseLocations(magentoFieldData)

            checkoutData = {
                ...checkoutData,
                ...locationsData,
                shipping: {initialValues}
            }
        }

        dispatch(receiveCheckoutData(checkoutData))
    }
}
