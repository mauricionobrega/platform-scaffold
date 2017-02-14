import {createAction} from '../../utils/utils'
import {extractMagentoShippingStepData} from '../../utils/magento-utils'

import parseLocations from './locations/parser'
import parseShippingInitialValues from './shipping/parser'

export const receiveCheckoutData = createAction('Receive Checkout Data')

export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', 'shipping')

export const processCheckoutData = ({payload: {$response}}) => {
    return (dispatch) => {
        const magentoFieldData = extractMagentoShippingStepData($response).getIn(['children', 'shipping-address-fieldset', 'children'])
        const initialValues = parseShippingInitialValues(magentoFieldData)
        const locationsData = parseLocations(magentoFieldData)

        dispatch(receiveCheckoutData({...locationsData, shipping: {initialValues}}))
    }
}
