import {createAction} from '../../utils/utils'
import {extractMagentoShippingStepData} from '../../utils/magento-utils'

import parseLocations from './locations/parser'
import parseShippingInitialValues from './shipping/parser'

export const receiveShippingLocations = createAction('Receive Checkout Shipping Location data')
export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values')

export const processCheckoutData = ({payload: {$response}}) => {
    return (dispatch) => {
        const magentoFieldData = extractMagentoShippingStepData($response).getIn(['children', 'shipping-address-fieldset', 'children'])
        const initialValues = parseShippingInitialValues(magentoFieldData)

        dispatch(receiveShippingLocations(parseLocations(magentoFieldData)))
        dispatch(receiveShippingMethodInitialValues({shipping: {initialValues}}))
    }
}
